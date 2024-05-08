import React, {useState} from 'react';
import SearchTrains from "../SearchTrains";
import SearchPlanes from "../SearchPlanes";
import styles from '../../css/views/SearchView.module.css';
function SearchView() {
    const [buttonPressed, setButtonPressed] = useState(1);
    //button color logic
    const [trainButtonStyle, setTrainButtonStyle] = useState(styles.selectButton);
    const [planeButtonStyle, setPlaneButtonStyle] = useState(styles.selectButton);

    // TODO add log out button
    // TODO change between found station and search view
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