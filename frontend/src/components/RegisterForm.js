import React, {useState} from 'react';
import styles from '../css/RegisterForm.module.css'

function RegisterForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


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

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!isValidEmail(email))
            alert('Wrong email!');
        if(!arePasswordTheSame(password, repeatPassword))
            alert('Passwords are different');

        console.log('username: ', password);
        console.log('email: ', password);
        console.log('Password: ', password);
        console.log('Password again: ', repeatPassword);
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