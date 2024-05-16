import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../css/SearchForm.module.css'

function SearchTrains() {
    //TODO add error handling if station input is wrong or server is notn responding

    const [trainStations, setTrainStations] = useState([])

    //station
    const [station, setStation] = useState('');
    //start-route
    const [startRoute, setStartRoute] = useState('');
    //end-route
    const [endRoute, setEndRoute] = useState('');

    //configuration for showing and hiding elements based on where the user is typing
    const [showStationInput, setShowStationInput] = useState(true);
    const [showRouteInput, setShowRouteInput] = useState(true);

    const handleStationChange = (e) => {
        const value = e.target.value;
        setStation(value);
        setShowRouteInput(value === '');
    };

    const handleRouteStartChange = (e) => {
        const value = e.target.value;
        setStartRoute(value);
        setShowStationInput(value === '' && endRoute === '');

    };

    const handleRouteEndChange = (e) => {
        const value = e.target.value;
        setEndRoute(value);
        setShowStationInput(value === '' && startRoute === '');
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

        let stationVar, startVar, endVar;

        const stationKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === station.toLowerCase());
        stationKey ? stationVar = stationKey.idStation : stationVar = 'Nan';

        const startKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === startRoute.toLowerCase());
        startKey ? startVar = startKey.idStation : startVar = 'Nan';

        const endKey = trainStations.find(trainStation => trainStation.stationName.toLowerCase() === endRoute.toLowerCase());
        endKey ? endVar = endKey.idStation : endVar = 'Nan';

    }

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
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