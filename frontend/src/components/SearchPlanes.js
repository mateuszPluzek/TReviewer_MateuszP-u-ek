import React, {useEffect, useState} from 'react';
import styles from '../css/SearchForm.module.css'
import axios from "axios";

function SearchPlanes() {
    // TODO copy the searchTrains so it work for the planes
    const [airports, setAirports] = useState([]);
    //airport
    const [airport, setAirport] = useState('');
    //start-route
    const [startRoute, setStartRoute] = useState('');
    //end-route
    const [endRoute, setEndRoute] = useState('');

    const [showAirportInput, setShowAirportInput] = useState(true);
    const [showRouteInput, setShowRouteInput] = useState(true);

    const handleAirportChange = (e) => {
        const value = e.target.value;
        setAirport(value);
        setShowRouteInput(value === '');

    };

    const handleRouteStartChange = (e) => {
        const value = e.target.value;
        setStartRoute(value);
        setShowAirportInput(value === '' && endRoute === '');

    };

    const handleRouteEndChange = (e) => {
        const value = e.target.value;
        setEndRoute(value);
        setShowAirportInput(value === '' && startRoute === '');
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchData(token);
    });

    const fetchData = async(token) => {
        try {
            const response = await axios.get("http://localhost:8080/stations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const filteredAirports = response.data.filter(station => station.stationType === 1);

            setAirports(filteredAirports);

        } catch(error) {
            console.error("error fetching data", error);
        }
    }

    const dataList = airports.map(station =>
        <option key={station.idStation} value={station.stationName}>{station.stationName}</option>
    );

    const submitHandler = async (event) => {
        event.preventDefault();
        if((airport!==''&&startRoute!=='') || (airport!==''&&endRoute!==''))
            alert("Can't search both")


        let airportVar, startVar, endVar;

        const airportKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === airport.toLowerCase());
        airportKey ? airportVar = airportKey.idStation : airportVar = 'Nan';

        const startKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === startRoute.toLowerCase());
        startKey ? startVar = startKey.idStation : startVar = 'Nan';

        const endKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === endRoute.toLowerCase());
        endKey ? endVar = endKey.idStation : endVar = 'Nan';


    }

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
            <div className={showAirportInput ? styles.visible : styles.hidden}>
                <input list='airports' className={styles.selectStation}
                       type='text'
                       name='airportName'
                       value={airport}
                       onChange={handleAirportChange}
                       placeholder='Select airport'>
                </input>
            </div>
            <hr className={styles.breakLine}></hr>
            <div className={showRouteInput ? styles.visible : styles.hidden}>
                <input list='airports' className={styles.selectStation}
                       type='text'
                       name='startRoute'
                       value={startRoute}
                       onChange={handleRouteStartChange}
                       placeholder='Select starting airport'>
                </input>
            </div>
            <div className={showRouteInput ? styles.visible : styles.hidden}>
                <input list='airports' className={styles.selectStation}
                       type='text'
                       name='endRoute'
                       value={endRoute}
                       onChange={handleRouteEndChange}
                       placeholder='Select destination'>
                </input>
            </div>

            <button className={styles.searchButton} type='submit'>Search</button>

            <datalist id='airports'>
                {dataList}
            </datalist>

        </form>
    );

}

export default SearchPlanes;