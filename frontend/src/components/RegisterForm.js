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

    // TODO validate credentials
    // TODO wrong credentials show where the error is
    // TODO confrimation of signup or error handling

    function isValidEmail() {
        if (email.match(/.+@+./i))
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
        return true;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!isValidEmail(email)) {
            alert('Wrong email!');
            return;
        }
        if(!isPasswordStrongEnough()) {
            alert('Passwords is too weak');
            return;
        }
        if(!arePasswordTheSame()) {
            alert('Passwords are different');
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/auth/signup",
                {
                    email,
                    password,
                    username
                });
            navigate("/login");
        }catch(error) {
            if(error) {
                console.error("registration failed", error);
            }
        }
    }

    return (
      <form className={styles.registerForm} onSubmit={submitHandler}>
          <input className={styles.textInputRegister}
                 type = 'text'
                 name = 'email'
                 value = {email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder='email'>
          </input>

          <input className={styles.textInputRegister}
                 type = 'password'
                 name = 'password'
                 value = {password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder='password'>
          </input>

          <input className={styles.textInputRegister}
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