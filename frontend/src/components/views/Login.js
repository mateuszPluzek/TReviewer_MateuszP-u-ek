import LoginForm from "../LoginForm";
import SignUp from "../SignUp";
import Logo from "../Logo";
import styles from '../../css/views/Login.module.css'
function Login() {

    return(
        <>
            <Logo/>
            <div className={styles.loginView}>
                <LoginForm/>
                <SignUp/>
            </div>
        </>
    );
}

export default Login;