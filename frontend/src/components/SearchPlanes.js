import React, {useEffect, useState} from 'react';
import styles from '../css/SearchForm.module.css'

function SearchPlanes() {
    // TODO copy the searchTrains so it work for the planes
    //airport
    const [airport, setAirport] = useState('');
    const [airportOptions, setAirportOptions] = useState([]);
    const testAirports = ['test1', 'test2', 'test3'];
    //start-route
    const [startRoute, setStartRoute] = useState('');
    const [startOptions, setStartOptions] = useState([]);
    const testStart = ['test1', 'test2', 'test3'];
    //end-route
    const [endRoute, setEndRoute] = useState('');
    const [endOptions, setEndOptions] = useState([]);
    const testEnd = ['test1', 'test2', 'test3'];

    useEffect(() => {
        setAirportOptions(testAirports);
        setStartOptions(testStart);
        setEndOptions(testEnd);
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();
        if((airport!==''&&startRoute!=='') || (airport!==''&&endRoute!==''))
            alert("Can't search both")

        console.log(airport);
        console.log(startRoute);
        console.log(endRoute);
    }

    return (
        <form className={styles.searchForm} onSubmit={submitHandler} autoComplete='off'>
            <input list='airports' className={styles.selectStation}
                   type='text'
                   name='airportName'
                   value={airport}
                   onChange={(e)=>setAirport(e.target.value)}
                   placeholder='Select airport'>
            </input>
            <hr className={styles.breakLine}></hr>
            <input list='startRoutes' className={styles.selectStation}
                   type='text'
                   name='startRoute'
                   value={startRoute}
                   onChange={(e)=>setStartRoute(e.target.value)}
                   placeholder='Select starting airport'>
            </input>

            <input list='endRoutes' className={styles.selectStation}
                   type='text'
                   name='endRoute'
                   value={endRoute}
                   onChange={(e)=>setEndRoute(e.target.value)}
                   placeholder='Select destination'>
            </input>

            <button className={styles.searchButton} type='submit'>Search</button>

            <datalist id='airports'>
                {airportOptions.map((option, index) => (
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

export default SearchPlanes;