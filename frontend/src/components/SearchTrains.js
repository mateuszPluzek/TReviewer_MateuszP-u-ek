import React, {useEffect, useState} from 'react';
import styles from '../css/SearchForm.module.css'

function SearchTrains() {
    // TODO fetch correct stations
    //station
    const [station, setStation] = useState('');
    const [stationOptions, setStationOptions] = useState([]);
    const testStations = ['test1', 'test2', 'test3'];
    //start-route
    const [startRoute, setStartRoute] = useState('');
    const [startOptions, setStartOptions] = useState([]);
    const testStart = ['test1', 'test2', 'test3'];
    //end-route
    const [endRoute, setEndRoute] = useState('');
    const [endOptions, setEndOptions] = useState([]);
    const testEnd = ['test1', 'test2', 'test3'];

    useEffect(() => {
        setStationOptions(testStations);
        setStartOptions(testStart);
        setEndOptions(testEnd);
    }, []);

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
            <input list='trainsStations' className={styles.selectStation}
                type='text'
                name='stationName'
                value={station}
                onChange={(e)=>setStation(e.target.value)}
                placeholder='Select train station'>
            </input>
            <hr className={styles.breakLine}></hr>
            <input list='startRoutes' className={styles.selectStation}
                   type='text'
                   name='startRoute'
                   value={startRoute}
                   onChange={(e)=>setStartRoute(e.target.value)}
                   placeholder='Select starting train station'>
            </input>

            <input list='endRoutes' className={styles.selectStation}
                   type='text'
                   name='endRoute'
                   value={endRoute}
                   onChange={(e)=>setEndRoute(e.target.value)}
                   placeholder='Select destination'>
            </input>

            <button className={styles.searchButton} type='submit'>Search</button>

            <datalist id='trainsStations'>
                {stationOptions.map((option, index) => (
                    <option value={option}>{option}</option>
                ))}
            </datalist>

            <datalist id='startRoutes'>
                {startOptions.map((option, index) => (
                    <option value={option}>{option}</option>
                ))}
            </datalist>

            <datalist id='endRoutes'>
                {endOptions.map((option, index) => (
                    <option value={option}>{option}</option>
                ))}
            </datalist>
        </form>
    );

}

export default SearchTrains;