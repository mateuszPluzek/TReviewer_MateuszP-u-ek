import React, {useEffect, useState} from 'react';
import styles from '../css/PostsSpace.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PostsSpace() {

    const [buttonPressed, setButtonPressed] = useState(1);
    //button color logic
    const [reviewButtonStyle, setReviewButtonStyle] = useState(styles.selectButton);
    const [infoButtonStyle, setInfoButtonStyle] = useState(styles.selectButton);

    const type = localStorage.getItem('type');
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([]);

    const navigation = useNavigate();

    useEffect( () => {
    if(buttonPressed !== 2) {
            handleReview();
        }
        const fetchData = async () => {

            if(localStorage.getItem('searchType') === 'station') {
                try {
                     const response = await axios.get("http://localhost:8080/stationPosts",
                        {
                             headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                     let filteredPosts;

                     if(localStorage.getItem('type') === 'train' && buttonPressed === 1)
                         filteredPosts = response.data.filter(post => post.postType === 0 && post.station.stationType === 0);
                    else if(localStorage.getItem('type') === 'train' && buttonPressed === 2)
                        filteredPosts = response.data.filter(post => post.postType === 0 && post.station.stationType === 1);
                    else if(localStorage.getItem('type') === 'plane' && buttonPressed === 1)
                        filteredPosts = response.data.filter(post => post.postType === 1 && post.station.stationType === 0);
                    else if(localStorage.getItem('type') === 'plane' && buttonPressed === 2)
                        filteredPosts = response.data.filter(post => post.postType === 1 && post.station.stationType === 1);

                    setPosts(filteredPosts);
                } catch(error) {
                    console.error("error fetching data", error);
                }
            }
            else if(localStorage.getItem('searchType') === 'route') {

            }
        };
            // try {
            //     const response = await axios.get("http://localhost:8080/routes/1",
            //         {
            //             headers: {
            //                 Authorization: `Bearer ${token}`
            //             }
            //         });
            //
            //     res = response.data.destination.stationName;
            // } catch(error) {
            //     console.error("error fetching data", error);
            // }

        fetchData();
    });

    const handleReview = () => {
        setButtonPressed(1);
        setReviewButtonStyle(styles.activeButton);
        setInfoButtonStyle(styles.selectButton);
    };
    const handleInfo = () => {
        setButtonPressed(2);
        setReviewButtonStyle(styles.selectButton);
        setInfoButtonStyle(styles.activeButton);
    };
    const handleAdd = () => {
        navigation("/post_input")
    };

    return (
        <div className={styles.postsSpace}>
            <div className={styles.buttons}>
                <button className={reviewButtonStyle} onClick={handleReview}>Review</button>
                <button className={infoButtonStyle} onClick={handleInfo}>Info</button>
            </div>
            <div className={styles.posts}>
                {posts.map(post => (
                    <div key={post.idStationPost} className={styles.post}>
                        <div className={styles.postHeader}>
                            <span className={styles.headerText}>{post.user.username}</span>
                            <span className={styles.headerText}>{post.creationDate.split('T')[0]}</span>
                            {/*remove button*/}
                        </div>
                        <div className={styles.postContent}>
                            {post.comment}
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.addButton} onClick={handleAdd}>+</button>
        </div>
    );
}

export default PostsSpace;