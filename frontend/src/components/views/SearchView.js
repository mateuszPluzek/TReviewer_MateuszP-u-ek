import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import SearchTrains from "../SearchTrains";
import SearchPlanes from "../SearchPlanes";
import LogOutButton from "../LogOutButton";
import styles from '../../css/views/SearchView.module.css';
import axios from "axios";

function SearchView() {
    const [buttonPressed, setButtonPressed] = useState(1);
    //button color logic
    const [trainButtonStyle, setTrainButtonStyle] = useState(styles.selectButton);
    const [planeButtonStyle, setPlaneButtonStyle] = useState(styles.selectButton);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favStations, setFavStations] = useState([]);


    const openModal = () => {
        setIsModalOpen(true);
        handleList();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect( () => {
        if(localStorage.getItem('buttonType')) {
            handlePlaneButton();
            localStorage.removeItem('buttonType');
        }
        else if(buttonPressed !== 2) {
            handleTrainButton();
        }
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
        }


    });
    const handleTrainButton = () => {
        setButtonPressed(1);
        setPlaneButtonStyle(styles.selectButton);
        setTrainButtonStyle(styles.activeButton);
    }
    const handlePlaneButton = () => {
        setButtonPressed(2);
        setPlaneButtonStyle(styles.activeButton);
        setTrainButtonStyle(styles.selectButton);
    }

    const handleList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/fav_stations/" + localStorage.getItem('userId'),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const stations = response.data;
            setFavStations(stations);
        } catch(error) {
            console.log(error);
        }
    }

    const goToFavourite = (station) => {
        if(station.stationType === 0) {
            localStorage.setItem('searchTrainStationId', station.idStation);
            localStorage.setItem('searchTrainStationName', station.stationName);
            navigate("/posts");
        }
        else {
            localStorage.setItem('searchPlaneStationId', station.idStation);
            localStorage.setItem('searchPlaneStationName', station.stationName);
            navigate("/posts");
        }
    };

    return (
      <div className={styles.searchView}>
          <div className={styles.searchFormDiv}>
              {
                  buttonPressed === 1 && (
                    <SearchTrains/>
                  )
              }
              {
                  buttonPressed === 2 && (
                      <SearchPlanes/>
                  )
              }
              <button className={styles.fixedButton} onClick={openModal}>Favourites</button>
              { isModalOpen && (
                  <div className={styles.modalOverlay}>
                      <div>
                          <button onClick={closeModal} className={styles.closeButton}>x</button>
                          <ul>
                              {favStations.map(station => (
                                  <li key={station.idStation} className={styles.favouriteStation} onClick={() => goToFavourite(station)}>
                                      {station.stationName}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              )

              }


              <LogOutButton/>
          </div>

          <div className={styles.buttonDiv}>
              <button className={trainButtonStyle} onClick={handleTrainButton}>
                  <img className={styles.logoImage} src={require('../../img/train_ico.png')}/>
              </button>
              <button className={planeButtonStyle} onClick={handlePlaneButton}>
                  <img className={styles.logoImage} src={require('../../img/plane_ico.png')}/>
              </button>
          </div>
      </div>
    );
}

export default SearchView;