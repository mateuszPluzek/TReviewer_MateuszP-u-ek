import React, {useEffect, useState} from 'react';
import styles from "../../css/views/Test.module.css";
import axios from "axios";
function Test() {
    const [stations, setStations] = useState([]);

    useEffect(async () => {
        try {
            const response = await axios.get("http://localhost:8080/stations");
            setStations(response.data);
        }
        catch(error) {
            console.error("Error fetching", error);
        }
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