import React, {useEffect, useState} from 'react';
import styles from '../../css/views/PostInput.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PostEdit() {

    const searchType = localStorage.getItem('searchType');
    const postEditId = parseInt(localStorage.getItem('postEditId'));
    const buttonPressed = localStorage.getItem('buttonPressed');
    const token = localStorage.getItem('token');

    const [comment, setComment] = useState('');
    const [tooManyError, setTooManyError] = useState(false);
    const [emptyText, setEmptyText] = useState(true);
    const navigator = useNavigate();


    useEffect(() => {
        getPostComment();
    }, []);

    const getPostComment = async () => {
        if(searchType === 'station') {
            try {
                const responseComment = await axios.get("http://localhost:8080/stationPosts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                const filterResponseComment = responseComment.data.filter(response => response.idStationPost === parseInt(localStorage.getItem('postEditId')));
                setComment(filterResponseComment[0].comment);
            }catch(error) {
                console.log(error);
            }
        }
        else {
            try {
                const responseComment = await axios.get("http://localhost:8080/routePosts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                const filterResponseComment = responseComment.data.filter(response=> response.idRoutePost === parseInt(localStorage.getItem('postEditId')));
                setComment(filterResponseComment[0].comment);
            }catch(error) {
                console.log(error);
            }
        }
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if(!tooManyError || !emptyText) {
            if(searchType === 'station') {
                try {
                    const response = await axios.put("http://localhost:8080/stationPosts/" + postEditId,
                        {
                            "comment": comment
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
                try {
                    const response = await axios.put("http://localhost:8080/routePosts/" + postEditId,
                        {
                            "comment": comment,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    navigator('/posts');
                }catch(error) {
                    console.log(error);
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

    const goBack = () => {
        navigator("/posts");
    }

    return(
        <div>
                <h1 className={styles.postHeader}>Editing {buttonPressed}</h1>


            <form className={styles.postForm} onSubmit={submitHandler}>
                {tooManyError && <b className={styles.errorText}>Too many characters (need less than 1400)</b>}
                <textarea className={`${styles.textInput} ${tooManyError ? styles.error: ''}`}
                          type='text'
                          name='comment'
                          value={comment}
                          onChange={handleChange}
                          placeholder="Text can't be longer than 1400 characters, and can't be empty">
                </textarea>
                <button className={styles.submitButton} onClick={goBack}>Go Back</button>
                <button className={styles.submitButton} type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default PostEdit;