import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../css/SearchForm.module.css'
import {useNavigate} from "react-router-dom";

function SearchTrains() {

    const [trainStations, setTrainStations] = useState([]);
    const [trainRoutes, setTrainRoutes] = useState([]);

    //station
    const [station, setStation] = useState(localStorage.getItem('searchTrainStationName'));
    //start-route
    const [startRoute, setStartRoute] = useState(localStorage.getItem('searchTrainRouteStartName'));
    //end-route
    const [endRoute, setEndRoute] = useState(localStorage.getItem('searchTrainRouteEndName'));

    //configuration for showing and hiding elements based on where the user is typing
    const [showStationInput, setShowStationInput] = useState(true);
    const [showRouteInput, setShowRouteInput] = useState(true);

    //not found
    const [stationNotFound, setStationNotFound] = useState('');

    const navigation = useNavigate();

    const handleStationChange = (e) => {
        const value = e.target.value;
        setStation(value);
        setShowRouteInput(value === '');
        setStationNotFound('');
    //     Remove route input
        setStartRoute('');
        setEndRoute('');

    };

    const handleRouteStartChange = (e) => {
        const value = e.target.value;
        setStartRoute(value);
        setShowStationInput(value === '' && endRoute === '');
        setStationNotFound('');
    //     Remove station input
        setStation('');
    };

    const handleRouteEndChange = (e) => {
        const value = e.target.value;
        setEndRoute(value);
        setShowStationInput(value === '' && startRoute === '');
        setStationNotFound('');
        //     Remove station input
        setStation('');
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
            const filteredStations = response.data.filter(station => station.stationType === 0);

            setTrainStations(filteredStations);

        } catch(error) {
            console.error("error fetching data", error);
        }
    }

    const dataList = trainStations.map(station =>
        <option value={station.stationName}>{station.stationName}</option>
    );


    const submitHandler = async (event) => {
        event.preventDefault();

        if((station!==''&&startRoute!=='') || (station!==''&&endRoute!==''))
            alert("Can't search both")

        const stationKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === station.toLowerCase());
        if(stationKey) {
            localStorage.setItem('searchTrainStationName', stationKey.stationName);
            localStorage.setItem('searchTrainStationId', stationKey.idStation);

            localStorage.removeItem('searchTrainRouteStartName');
            localStorage.removeItem('searchTrainRouteEndName');
            localStorage.setItem('type', 'train');
            localStorage.setItem('searchType', 'station');
            navigation('/posts');
        }
        else {
            if(!startRoute || !endRoute)
                setStationNotFound('Station not found');
            localStorage.setItem('searchTrainStationName', '');
            localStorage.setItem('searchTrainStationId', 'Nan');
        }

        const startKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === startRoute.toLowerCase());
        if(startKey) {
            localStorage.setItem('searchTrainRouteStartName', startKey.stationName);
            localStorage.setItem('searchTrainRouteStartId', startKey.idStation);
        }
        else {
            if(!station)
                setStationNotFound('Route station not found');
            localStorage.setItem('searchTrainRouteStartName', '');
            localStorage.setItem('searchTrainRouteStartId', 'Nan');
        }

        const endKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === endRoute.toLowerCase());
        if(endKey) {
            localStorage.setItem('searchTrainRouteEndName', endKey.stationName);
            localStorage.setItem('searchTrainRouteEndId', endKey.idStation);
        }
        else {
            if(!station)
                setStationNotFound('Route station not found');
            localStorage.setItem('searchTrainRouteEndName', '');
            localStorage.setItem('searchTrainRouteEndId', 'NaN');
        }
        if(startKey && endKey) {
            localStorage.removeItem('searchTrainStationName');
            localStorage.setItem('type', 'train');
            localStorage.setItem('searchType', 'route');
            navigation('/posts');
        }
    };

    const findRoute = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/routes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const filteredStations = response.data.filter(route => route.routeType === 0);

            setTrainRoutes(filteredStations);

        } catch(error) {
            console.error("error fetching data", error);
        }

    };

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
            {(stationNotFound) && <b className={styles.notFound}>Station not found</b>}
            <div className={showStationInput ? styles.visible : styles.hidden}>
                <input list='trainStations' className={styles.selectStation}
                    type='text'
                    name='stationName'
                    value={station}
                    onChange={handleStationChange}
                    placeholder='Select train station'>
                </input>
            </div>
            <hr className={styles.breakLine}></hr>
            <div className={showRouteInput ? styles.visible : styles.hidden}>
                <input list='trainStations' className={styles.selectStation}
                       type='text'
                       name='startRoute'
                       value={startRoute}
                       onChange={handleRouteStartChange}
                       placeholder='Select starting train station'>
                </input>
            </div>
            <div className={showRouteInput ? styles.visible : styles.hidden}>
                <input list='trainStations' className={styles.selectStation}
                       type='text'
                       name='endRoute'
                       value={endRoute}
                       onChange={handleRouteEndChange}
                       placeholder='Select destination'>
                </input>
            </div>

            <button className={styles.searchButton} type='submit'>Search</button>

            <datalist id='trainStations'>
                {dataList}
            </datalist>

        </form>
    );

}

export default SearchTrains;