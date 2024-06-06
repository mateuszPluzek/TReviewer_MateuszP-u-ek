import React, {useEffect, useState} from 'react';
import styles from '../css/SearchForm.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SearchPlanes() {

    const [airports, setAirports] = useState([]);
    //airport
    const [airport, setAirport] = useState(localStorage.getItem('searchPlaneStationName'));
    //start-route
    const [startRoute, setStartRoute] = useState(localStorage.getItem('searchPlaneRouteStartName'));
    //end-route
    const [endRoute, setEndRoute] = useState(localStorage.getItem('searchPlaneRouteEndName'));

    const [showAirportInput, setShowAirportInput] = useState(true);
    const [showRouteInput, setShowRouteInput] = useState(true);

    const [stationNotFound, setStationNotFound] = useState('');

    const navigation = useNavigate();

    const handleAirportChange = (e) => {
        const value = e.target.value;
        setAirport(value);
        setShowRouteInput(value === '');
        //     Remove route input
        setStartRoute('');
        setEndRoute('');

    };

    const handleRouteStartChange = (e) => {
        const value = e.target.value;
        setStartRoute(value);
        setShowAirportInput(value === '' && endRoute === '');
        //     Remove station input
        setAirport('');
    };

    const handleRouteEndChange = (e) => {
        const value = e.target.value;
        setEndRoute(value);
        setShowAirportInput(value === '' && startRoute === '');
        //     Remove station input
        setAirport('');
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

        const airportKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === airport.toLowerCase());

        if(airportKey) {
            localStorage.setItem('searchPlaneStationName', airportKey.stationName);
            localStorage.setItem('searchPlaneStationId', airportKey.idStation);

            localStorage.removeItem('searchPlaneRouteStartName');
            localStorage.removeItem('searchPlaneRouteEndName');
            localStorage.setItem('type', 'plane');
            localStorage.setItem('searchType', 'station');
            navigation('/posts');
        }
        else {
            if(!startRoute || !endRoute)
                setStationNotFound('Airport not found');
            localStorage.setItem('searchPlaneStationName', '');
            localStorage.setItem('searchPlaneStationId', 'Nan');
        }

        const startKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === startRoute.toLowerCase());
        if(startKey) {
            localStorage.setItem('searchPlaneRouteStartName', startKey.stationName);
            localStorage.setItem('searchPlaneRouteStartId', startKey.idStation);
        }
        else {
            if(!airport)
                setStationNotFound('Route station not found');
            localStorage.setItem('searchPlaneRouteStartName', '');
            localStorage.setItem('searchPlaneRouteStartId', 'Nan');
        }

        const endKey = airports.find(airportStation => airportStation.stationName.toLowerCase() === endRoute.toLowerCase());
        if(endKey) {
            localStorage.setItem('searchPlaneRouteEndName', endKey.stationName);
            localStorage.setItem('searchPlaneRouteEndId', endKey.idStation);
        }
        else {
            if(!airport)
                setStationNotFound('Route station not found');
            localStorage.setItem('searchPlaneRouteEndName', '');
            localStorage.setItem('searchPlaneRouteEndId', 'NaN');
        }
        if(startKey && endKey) {
            localStorage.removeItem('searchPlaneStationName');
            localStorage.setItem('type', 'plane');
            localStorage.setItem('searchType', 'route');
            navigation('/posts');
        }
    };

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
            {(stationNotFound) && <b className={styles.notFound}>Station not found</b>}
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