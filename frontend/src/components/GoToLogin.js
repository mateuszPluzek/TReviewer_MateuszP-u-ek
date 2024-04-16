import styles from '../css/GoToLogin.module.css'

function GoToLogin() {
    return (
        <a className={styles.goToLoginButton} href = "/login">Go back to login</a>
    );
}
export default GoToLogin;
