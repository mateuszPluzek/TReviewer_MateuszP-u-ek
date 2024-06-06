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
            //Data for post or review
            let postType;
            const idUser = parseInt(localStorage.getItem('userId'));
            const creationDate = new Date().toISOString();
            if(buttonPressed === 'review')
                postType = 0;
            else if(buttonPressed === 'info')
                postType = 1;

            if(searchType === 'station') {
                let idStation;

                if(type === 'train')
                    idStation = parseInt(localStorage.getItem('searchTrainStationId'));
                else
                    idStation = parseInt(localStorage.getItem('searchPlaneStationId'));

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
                const idRoute = parseInt(localStorage.getItem('routeId'));

                try {
                    const response = await axios.post("http://localhost:8080/routePosts",
                        {
                            "user": {
                                idUser
                            },
                            "route": {
                                idRoute
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
                    console.log(idRoute);
                    navigator('/posts');
                }catch(error) {
                    console.log("post failed!");
                }
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

    return(
        <div>

            {   searchType === 'station' && type === 'train' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchTrainStationName')} - {buttonPressed}</h1>
            }
            {   searchType === 'station' && type === 'plane' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchPlaneStationName')} - {buttonPressed}</h1>
            }
            {   searchType === 'route' && type === 'train' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchTrainRouteStartName')+'-'+localStorage.getItem('searchTrainRouteEndName')} - {buttonPressed} - {localStorage.getItem('selectedOperatorName')}</h1>
            }
            {   searchType === 'route' && type === 'plane' &&
                <h1 className={styles.postHeader}>{localStorage.getItem('searchPlaneRouteStartName')+'-'+localStorage.getItem('searchPlaneRouteEndName')} - {buttonPressed} - {localStorage.getItem('selectedOperatorName')}</h1>
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