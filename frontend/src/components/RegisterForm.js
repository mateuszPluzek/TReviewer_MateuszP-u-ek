import React, {useState} from 'react';
import styles from '../css/RegisterForm.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RegisterForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    // Errors
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageRepeat, setErrorMessageRepeat] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepeat, setErrorRepeat] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    function isValidEmail() {
        if (email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i))
            return true;
        else
            return false;
    }

    function arePasswordTheSame() {
        if(password === repeatPassword)
            return true
        else
            return false;
    }

    function isPasswordStrongEnough() {
        return password.length > 5;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let hasError = false;

        if(!isValidEmail(email)) {
            setErrorMessageEmail('Incorrect email');
            setErrorEmail(true);
            hasError = true;
        }
        if(!isPasswordStrongEnough()) {
            setErrorMessagePassword('Password must be longer than 5 characters');
            setErrorPassword(true);
            hasError = true;
        }
        if(!arePasswordTheSame()) {
            setErrorMessageRepeat('The passwords are not the same');
            setErrorRepeat(true);
            hasError = true;
        }
        if(hasError) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/signup",
                {
                    email,
                    password,
                    username
                });

            localStorage.setItem('register', "Registered successfully");
            navigate("/login");

        }catch(error) {
            setErrorMessage("registration failed try later");
        }
    }

    return (
      <form className={styles.registerForm} onSubmit={submitHandler}>
          {(errorMessage !== '') && <b className={styles.errorMessage}>{errorMessage}</b>}

          {(errorMessageEmail !== '') && <b className={styles.errorMessage}>{errorMessageEmail}</b>}
          <input className={`${styles.textInputRegister} ${errorEmail ? styles.error : ''}`}
                 type = 'text'
                 name = 'email'
                 value = {email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder='email'>
          </input>

          {(errorMessagePassword !== '') && <b className={styles.errorMessage}>{errorMessagePassword}</b>}
          <input className={`${styles.textInputRegister} ${errorPassword ? styles.error: ''}`}
                 type = 'password'
                 name = 'password'
                 value = {password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder='password'>
          </input>

          {(errorMessageRepeat !== '') && <b className={styles.errorMessage}>{errorMessageRepeat}</b>}
          <input className={`${styles.textInputRegister} ${errorRepeat ? styles.error: ''}`}
                 type = 'password'
                 name = 'repeatPassword'
                 value = {repeatPassword}
                 onChange={(e) => setRepeatPassword(e.target.value)}
                 placeholder='repeat password'>
          </input>

          <input className={styles.textInputRegister}
                 type = 'text'
                 name = 'username'
                 value = {username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder='username'>
          </input>

          <button className={styles.registerButton} type = 'submit'>Register</button>
      </form>
    );
}

export default RegisterForm;