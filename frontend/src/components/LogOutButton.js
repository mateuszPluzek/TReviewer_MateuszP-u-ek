import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../css/LogOutButton.module.css';

function LogOutButton() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/');
    }

    return (
    <div className={styles.logOutDiv}>
        <button className={styles.logOutButton} onClick={handleLogout}>
            Log out
        </button>
    </div>
    );

}

export default LogOutButton;