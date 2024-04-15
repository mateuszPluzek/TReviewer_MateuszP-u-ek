import {useState} from 'react';
import styles from '../css/TestButton.css';
function TestButton() {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick = {handleClick} className={'testButton'}>
            Clicked {count} times
        </button>
    );
}

export default TestButton;