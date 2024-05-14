import React, {useEffect, useState} from 'react';
import styles from "../../css/views/Test.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Test() {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
        }
        else {
            fetchData(token);
        }
    });

    const fetchData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/stations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setStations(response.data);
        }
        catch(error) {
            console.error("Error fetching", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const stationList = stations.map(station =>
        <li key={station.idStation}> {station.stationName} </li>
    );

    return (
        <div className={styles.testDiv}>
            <h2>Stations</h2>
            <ul>
                {stationList}
            </ul>
            <button onClick={handleLogout}>
                LOGOUT
            </button>
        </div>
    );
}

export default Test;