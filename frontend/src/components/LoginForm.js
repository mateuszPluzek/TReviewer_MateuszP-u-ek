import React, {useState, useEffect} from 'react';
import axios from "axios";
import styles from '../css/LoginForm.module.css';
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [credentialsError, setCredentialsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [signupMessage, setSignupMessage] = useState('');

    useEffect(() => {
       const registerMessage = localStorage.getItem('register');
       if(registerMessage !== null) {
           setSignupMessage(registerMessage);
           localStorage.removeItem('register');
       }
    });

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/login",
                {
                   username,
                   password
                });
            const token = response.data.token;
            localStorage.setItem('token', token);
        //     go to page
            navigate("/search");

        } catch(error) {
            if(error.response && error.response.status === 403) {
                setErrorMessage('Incorrect username or password');
                setCredentialsError(true);
            }
            else
                setErrorMessage('Login error, try later');
        }
    }

    return (
        <form className={styles.loginForm} onSubmit={submitHandler}>
            {(signupMessage !== '') && <b>{signupMessage}</b>}
            {(errorMessage !== '') && <p className={styles.errorMessage}>{errorMessage}</p>}
            <input className={`${styles.textInputLogin} ${credentialsError ? styles.error : ''}`}
                type = 'text'
                name = "username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder = 'username'>
            </input>

            <input className={`${styles.textInputLogin} ${credentialsError ? styles.error : ''}`}
                   type = 'password'
                   name = "password"
                   value = {password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder = 'password'>
            </input>

            <button className={styles.logInButton} type = 'submit'>Sign in</button>
        </form>
    );
};

export default LoginForm;