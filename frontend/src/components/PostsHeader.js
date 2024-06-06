import React, {useEffect, useState} from 'react';
import Logo from "./Logo";
import styles from "../css/PostHeaders.module.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

function PostHeaders() {

    const [stationFavorite, setStationFavorite] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(styles.fixedButton);
    const token = localStorage.getItem('token');

    useEffect( () => {
        fetchFavStations();
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

    const fetchFavStations = async () => {
        try {
            const responseFavourite = await axios.get("http://localhost:8080/fav_stations/" + localStorage.getItem('userId'),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            let favStation;

            if(localStorage.getItem('type') === 'train')
                favStation = responseFavourite.data.filter(res => res.idStation === parseInt(localStorage.getItem('searchTrainStationId')));
            else
                favStation = responseFavourite.data.filter(res => res.idStation === parseInt(localStorage.getItem('searchPlaneStationId')));

            if(favStation != '') {
                setButtonStyle(styles.active);
                setStationFavorite(true);
            }
            else {
                setStationFavorite(false);
            }

        }catch(error) {
            console.log(error);
        }
    };


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

    const handleButton = async () => {
        let stationId;
        if(localStorage.getItem('type') === 'train') {
            stationId = localStorage.getItem('searchTrainStationId');
        }
        else {
            stationId = localStorage.getItem('searchPlaneStationId');
        }

        if(stationFavorite) {
            try {
                const responseDelete = await axios.delete("http://localhost:8080/fav_stations/" + localStorage.getItem('userId') + "/" + stationId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setButtonStyle(styles.fixedButton);
                setStationFavorite(false);
            } catch(error) {
                console.log(error);
            }
        } else {
            try {
                const responseAdd = await axios.post("http://localhost:8080/fav_stations/" + localStorage.getItem('userId') + "/" + stationId,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setButtonStyle(styles.active);
                setStationFavorite(true);
            } catch(error) {
                console.log(error);
            }
        }
    }

    return(
        <div>
            <p className={styles.foundStation} onClick={handleClick}> {station}</p>
            { localStorage.getItem('searchType') === 'station' &&
            <button className={buttonStyle} onClick={handleButton}>+</button>
            }
        </div>
    )

}

export default PostHeaders;