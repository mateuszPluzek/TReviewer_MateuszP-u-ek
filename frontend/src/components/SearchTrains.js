import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../css/SearchForm.module.css'

function SearchTrains() {
    //TODO
    // train stations options
    const [trainStations, setTrainStations] = useState([])

    //station
    const [station, setStation] = useState('');
    //start-route
    const [startRoute, setStartRoute] = useState('');
    //end-route
    const [endRoute, setEndRoute] = useState('');


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
        <option value={station.idStation}>{station.stationName}</option>
    );


    const submitHandler = async (event) => {
        event.preventDefault();
        if((station!==''&&startRoute!=='') || (station!==''&&endRoute!==''))
            alert("Can't search both")

        console.log(station);
        console.log(startRoute);
        console.log(endRoute);
    }

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
            <input list='trainStations' className={styles.selectStation}
                type='text'
                name='stationName'
                value={station}
                onChange={(e)=>setStation(e.target.value)}
                placeholder='Select train station'>
            </input>
            <hr className={styles.breakLine}></hr>
            <input list='trainStations' className={styles.selectStation}
                   type='text'
                   name='startRoute'
                   value={startRoute}
                   onChange={(e)=>setStartRoute(e.target.value)}
                   placeholder='Select starting train station'>
            </input>

            <input list='trainStations' className={styles.selectStation}
                   type='text'
                   name='endRoute'
                   value={endRoute}
                   onChange={(e)=>setEndRoute(e.target.value)}
                   placeholder='Select destination'>
            </input>

            <button className={styles.searchButton} type='submit'>Search</button>

            <datalist id='trainStations'>
                {dataList}
            </datalist>

        </form>
    );

}

export default SearchTrains;