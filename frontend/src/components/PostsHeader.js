import React, {useEffect} from 'react';
import Logo from "./Logo";
import styles from "../css/PostHeaders.module.css"
import {useNavigate} from "react-router-dom";

function PostHeaders() {


    useEffect( () => {
        if(localStorage.getItem('searchType') === 'route') {
            if(localStorage.getItem('type') === 'train') {
                localStorage.setItem('searchTrainStationName' , '');
            }
            else {
                localStorage.setItem('searchPlaneStationName', '');
            }
        }
        else {
            if(localStorage.getItem('type') === 'train') {
                localStorage.setItem('searchTrainRouteStartName', '');
                localStorage.setItem('searchTrainRouteEndName', '');
            }
            else {
                localStorage.setItem('searchPlaneRouteStartName', '');
                localStorage.setItem('searchPlaneRouteEndName', '');
            }
        }
    });

    let station;
    if(localStorage.getItem('type') === 'train') {
        localStorage.removeItem('buttonType');

        if (localStorage.getItem('searchType') === 'station') {
            station = localStorage.getItem('searchTrainStationName');
        } else if (localStorage.getItem('searchType') === 'route') {
            station = localStorage.getItem('searchTrainRouteStartName') + ' - ' + localStorage.getItem('searchTrainRouteEndName');
        }
    }
    else if(localStorage.getItem('type') === 'plane') {
        localStorage.setItem('buttonType', 'plane');

        if (localStorage.getItem('searchType') === 'station') {
            station = localStorage.getItem('searchPlaneStationName');
        } else if (localStorage.getItem('searchType') === 'route') {
            station = localStorage.getItem('searchPlaneRouteStartName') + ' - ' + localStorage.getItem('searchPlaneRouteEndName');
        }
    }

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