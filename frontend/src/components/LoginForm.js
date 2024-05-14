import React, {useState, useEffect} from 'react';
import axios from "axios";
import styles from '../css/LoginForm.module.css';
import { useNavigate } from "react-router-dom";

function LoginForm() {

    // TODO if credentials are incorrect show red text and outlines
    // TODO otherwise show red text that login wasn't succesful

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
            if(error.response && error.response.status === 403)
                alert("Incorrect credentials!");
            else
                console.error("Login failed", error);
        }
    }

    return (
        <form className={styles.loginForm} onSubmit={submitHandler}>
            <input className={styles.textInputLogin}
                type = 'text'
                name = "username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder = 'username'>
            </input>

            <input className={styles.textInputLogin}
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