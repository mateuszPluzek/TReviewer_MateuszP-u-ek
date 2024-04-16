import React, {useState} from 'react';
import SearchTrains from "../SearchTrains";
import SearchPlanes from "../SearchPlanes";
import styles from '../../css/views/SearchView.module.css';
function SearchView() {
    const [buttonPressed, setButtonPressed] = useState(1);
    // TODO buttons change color based on wich one is clicked
    const handleTrainButton = () => {
        setButtonPressed(1);
    }
    const handlePlaneButton = () => {
        setButtonPressed(2);
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
              <button className={styles.selectButton} onClick={handleTrainButton}>
                  <img className={styles.logoImage} src={require('../../img/train_ico.png')}/>
              </button>
              <button className={styles.selectButton} onClick={handlePlaneButton}>
                  <img className={styles.logoImage} src={require('../../img/plane_ico.png')}/>
              </button>
          </div>
      </div>
    );
}

export default SearchView;