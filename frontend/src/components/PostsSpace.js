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

                    if(type === 'train' && buttonPressed === 1)
                        filteredPosts = response.data.filter(post => post.postType === 0 && post.station.stationType === 0 && post.station.idStation === parseInt(localStorage.getItem('searchTrainStationId')));
                    else if(type === 'train' && buttonPressed === 2)
                        filteredPosts = response.data.filter(post => post.postType === 1 && post.station.stationType === 0 && post.station.idStation === parseInt(localStorage.getItem('searchTrainStationId')));
                    else if(type === 'plane' && buttonPressed === 1)
                        filteredPosts = response.data.filter(post => post.postType === 1 && post.station.stationType === 0 && post.station.idStation === parseInt(localStorage.getItem('searchPlaneStationId')));
                    else if(type === 'plane' && buttonPressed === 2)
                        filteredPosts = response.data.filter(post => post.postType === 1 && post.station.stationType === 1 && post.station.idStation === parseInt(localStorage.getItem('searchPlaneStationId')));

                    setPosts(filteredPosts);
                } catch(error) {
                    console.error("error fetching data", error);
                }
            }
            else if(localStorage.getItem('searchType') === 'route') {
            //     TODO obsługa route
            }
        };

        fetchData();
    });

    const handleDelete = (postId) => {
        try {
            const response = axios.delete("http://localhost:8080/stationPosts/"+postId,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        }catch(error) {
            console.error("error deleting data", error);
        }
    }

    const handleEdit = (postId) => {
        alert(postId);
    }

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
        if(buttonPressed === 1)
            localStorage.setItem('buttonPressed', 'review');
        else
            localStorage.setItem('buttonPressed', 'info');
        navigation("/post_input")
    };

    const determineId = (post) => {
        if(localStorage.getItem('searchType') === 'station')
            return post.idStationPost;
        else
            return post.idRoutePost;
    }

    return (
        <div className={styles.postsSpace}>
            <div className={styles.buttons}>
                <button className={reviewButtonStyle} onClick={handleReview}>Review</button>
                <button className={infoButtonStyle} onClick={handleInfo}>Info</button>
            </div>
            <div className={styles.posts}>
                {posts.map(post => (
                    <div className={styles.post}>
                        <div className={styles.postHeader} key={determineId(post)}>
                            <span className={styles.headerText}>{post.user.username}</span>
                            <span className={styles.headerText}>{post.creationDate.split('T')[0]}</span>
                            {localStorage.getItem('searchType') === 'route' &&
                                <span className={styles.headerText}>Operator: post.operator.operator</span>}
                            {post.user.idUser === parseInt(localStorage.getItem('userId')) &&
                                <button className={styles.editPost} onClick={()=>handleEdit(post.idStationPost)}>Edit</button>}
                            {(post.user.idUser === parseInt(localStorage.getItem('userId')) || (userType === "admin")) &&
                                <button className={styles.adminDelete} onClick={()=>handleDelete(post.idStationPost)}>Delete</button>}
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