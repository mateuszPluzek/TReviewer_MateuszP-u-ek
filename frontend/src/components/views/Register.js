import Logo from "../Logo";
import RegisterForm from "../RegisterForm";
import GoToLogin from "../GoToLogin";
import styles from '../../css/views/Register.module.css';
function Register() {

    return (
        <div className={styles.registerView}>
            <Logo/>
            <RegisterForm/>
            <GoToLogin/>
        </div>
    );
}

export default Register;