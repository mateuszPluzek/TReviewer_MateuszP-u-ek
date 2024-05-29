import React from 'react';
import Logo from "./Logo";
import styles from "../css/PostHeaders.module.css"
import {useNavigate} from "react-router-dom";

function PostHeaders() {

    // TODO CHANGE the behaviout based depending if this is a route or a station
    // const type

    const station = localStorage.getItem('searchTrainStationName');
    const navigate = useNavigate();

    const handleClick = (() => {
       navigate("/search")
    });

    return(
        <div>
            <p className={styles.foundStation} onClick={handleClick}> {station}</p>
        </div>
    )

}

export default PostHeaders;