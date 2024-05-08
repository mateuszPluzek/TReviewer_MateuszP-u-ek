import React, {useEffect, useState} from 'react';
import styles from "../../css/views/Test.module.css";
function Test() {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/stations")
            .then(response => response.json())
            .then(data => setStations(data))
            .catch(error => console.error("Error fetching", error));
    }, []);

    const stationList = stations.map(station =>
        <li key={station.idStation}> {station.stationName} </li>
    );

    return (
        <div className={styles.testDiv}>
            <h2>Stations</h2>
            <ul>
                {stationList}
            </ul>
        </div>
    );
}

export default Test;