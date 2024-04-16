import {useState} from 'react';
import styles from '../css/TestButton.module.css';
function TestButton() {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick = {handleClick} className={styles.testButton}>
            Clicked {count} times
        </button>
    );
}

export default TestButton;