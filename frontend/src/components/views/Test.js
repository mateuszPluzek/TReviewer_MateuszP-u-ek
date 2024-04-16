import React, {useEffect, useState} from 'react';
import styles from "../../css/views/Test.module.css";
function Test() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        fetch("<http://localhost:8080/api/users>")
            .then(response => response.json())
            .then(data => {console.log(data);setTemplates(data);})
            .catch(error => console.error("Error fetching", error));
    }, []);

    // const templatesList = templates.map(template =>
    //     <li key={template.id}> {template.text} </li>
    // );

    return (
        <div className={styles.testDiv}>
            <h2>Templates</h2>
            <ul>
                {/*{templatesList}*/}
            </ul>
        </div>
    );
}

export default Test;