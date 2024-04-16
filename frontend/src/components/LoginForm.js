import React, {useState} from 'react';
import styles from '../css/LoginForm.module.css';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('Email: ', email);
        console.log('Password: ', password);
    }

    return (
        <form className={styles.loginForm} onSubmit={submitHandler}>
            <input className={styles.textInputLogin}
                type = 'text'
                name = "email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder = 'email'>
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