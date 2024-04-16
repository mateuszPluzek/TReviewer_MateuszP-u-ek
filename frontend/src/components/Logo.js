import styles from '../css/Logo.module.css'

function Logo() {


    return (
        <div className={styles.logoDiv}>
          <img className={styles.logoImage}
            src={require('../img/logo.png')}
            alt='Logo image'
          />
        </div>

    );
}

export default Logo;