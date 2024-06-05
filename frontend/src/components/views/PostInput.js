import React, {useState} from 'react';
import styles from '../../css/views/PostInput.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PostInput() {

    const searchType = localStorage.getItem('searchType');
    const type = localStorage.getItem('type');
    const buttonPressed = localStorage.getItem('buttonPressed');
    const token = localStorage.getItem('token');

    const [comment, setComment] = useState('');
    const [tooManyError, setTooManyError] = useState(false);
    const [emptyText, setEmptyText] = useState(true);
    const navigator = useNavigate();
    const submitHandler = async (event) => {
        event.preventDefault();
        if(!tooManyError || !emptyText) {
            if(searchType === 'station') {
                const idUser = parseInt(localStorage.getItem('userId'));
                const creationDate = new Date().toISOString();
                let idStation, postType;

                if(type === 'train')
                    idStation = parseInt(localStorage.getItem('searchTrainStationId'));
                else
                    idStation = parseInt(localStorage.getItem('searchPlaneStationId'));

                if(buttonPressed === 'review')
                    postType = 0;
                else if(buttonPressed === 'info')
                    postType = 1;


                try {
                    const response = await axios.post("http://localhost:8080/stationPosts",
                        {
                                "user": {
                                    idUser
                                },
                                "station": {
                                    idStation
                                },
                                "comment": comment,
                                "creationDate": creationDate,
                                "postType": postType
                            },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    navigator('/posts');
                }catch(error) {
                    console.log("post failed!");
                }
            }
            else {
            //     TODO Route
            }
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setComment(value);

        if (comment.length > 1400) {
            setTooManyError(true);
        }
        else {
            setTooManyError(false);
        }

        if(comment.length <= 1) {
            setEmptyText(true);
        }
        else {
            setEmptyText(false);
        }
    }

    // TODO add list to

    return(
        <div>

            {   searchType === 'station' && type === 'train' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchTrainStationName')} - {buttonPressed}</h1>
            }
            {   searchType === 'station' && type === 'plane' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchPlaneStationName')} - {buttonPressed}</h1>
            }
            {   searchType === 'route' && type === 'train' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchTrainRouteStartName')+'-'+localStorage.getItem('searchTrainRouteEndName')} - {buttonPressed}</h1>
            }
            {   searchType === 'route' && type === 'plane' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchPlaneRouteStartName')+'-'+localStorage.getItem('searchPlaneRouteEndName')} - {buttonPressed}</h1>
            }



            <form className={styles.postForm} onSubmit={submitHandler}>
                {tooManyError && <b className={styles.errorText}>Too many characters (need less than 1400)</b>}
                <textarea className={`${styles.textInput} ${tooManyError ? styles.error: ''}`}
                    type='text'
                    name='comment'
                    value={comment}
                    onChange={handleChange}
                    placeholder="Text can't be longer than 1400 characters, and can't be empty">
                </textarea>
                <button className={styles.submitButton} type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default PostInput;