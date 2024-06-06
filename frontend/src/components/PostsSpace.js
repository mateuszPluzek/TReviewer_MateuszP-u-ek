import React, {useEffect, useState} from 'react';
import styles from '../css/PostsSpace.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PostsSpace() {

    const [buttonPressed, setButtonPressed] = useState(1);
    //button color logic
    const [reviewButtonStyle, setReviewButtonStyle] = useState(styles.selectButton);
    const [infoButtonStyle, setInfoButtonStyle] = useState(styles.selectButton);
    //route operator list logic
    const [selectedOperator, setSelectedOperator] = useState(null)
    const [operatorData, setOperatorData] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);

    const type = localStorage.getItem('type');
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([]);
    //used to check the time of the posts
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - (48 * 60 * 60 * 1000));

    //error if route doesnt exist
    const [routeDoesNotExist, setRouteDoesNotExist] = useState(false);

    const navigation = useNavigate();

    useEffect( () => {
        if(buttonPressed !== 2) {
            handleReview();
        }
        fetchData();
    });
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
                    filteredPosts = response.data.filter(post => post.postType === 0 && post.station.idStation === parseInt(localStorage.getItem('searchTrainStationId'))).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                else if(type === 'train' && buttonPressed === 2)
                    filteredPosts = response.data.filter(post => post.postType === 1 && post.station.idStation === parseInt(localStorage.getItem('searchTrainStationId')) && new Date(post.creationDate) >= fortyEightHoursAgo).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                else if(type === 'plane' && buttonPressed === 1)
                    filteredPosts = response.data.filter(post => post.postType === 0 && post.station.idStation === parseInt(localStorage.getItem('searchPlaneStationId'))).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                else if(type === 'plane' && buttonPressed === 2)
                    filteredPosts = response.data.filter(post => post.postType === 1 && post.station.idStation === parseInt(localStorage.getItem('searchPlaneStationId')) && new Date(post.creationDate) >= fortyEightHoursAgo).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

                setPosts(filteredPosts);
            } catch(error) {
                console.error("error fetching data", error);
            }
        }
        else if(localStorage.getItem('searchType') === 'route') {
            try {
                const responseOperators = await axios.get("http://localhost:8080/operators",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                if(type === 'train')
                    setOperatorData(responseOperators.data.filter(operator => operator.operatorType === 0));
                else
                    setOperatorData(responseOperators.data.filter(operator => operator.operatorType === 1));
                if(!selectedOperator)
                    setSelectedOperator(operatorData[0].operator);
            }catch(error) {
                console.error("error fetching data", error);
            }

            try {
                const responseRoutes = await axios.get("http://localhost:8080/routes",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                let route;
                if(type === 'train')
                    route = responseRoutes.data.filter(post => post.operator.operator === selectedOperator && post.station.idStation === parseInt(localStorage.getItem('searchTrainRouteStartId')) && post.destination.idStation === parseInt(localStorage.getItem('searchTrainRouteEndId')));
                else
                    route = responseRoutes.data.filter(post => post.operator.operator === selectedOperator && post.station.idStation === parseInt(localStorage.getItem('searchPlaneRouteStartId')) && post.destination.idStation === parseInt(localStorage.getItem('searchPlaneRouteEndId')));

                if(route != '') {
                    setRouteDoesNotExist(false);

                    try {
                        const response = await axios.get("http://localhost:8080/routePosts",
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        let filteredPosts;

                        localStorage.setItem('routeId', route[0].idRoute);

                        if(buttonPressed === 1)
                            filteredPosts = response.data.filter(post => post.postType === 0 && route[0].idRoute === post.route.idRoute).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                        else if(buttonPressed === 2)
                            filteredPosts = response.data.filter(post => post.postType === 1 && route[0].idRoute === post.route.idRoute && new Date(post.creationDate) >= fortyEightHoursAgo).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

                        setPosts(filteredPosts);
                    }catch(error) {
                        console.error("error fetching data", error);
                    }
                }
                else {
                    setRouteDoesNotExist(true);
                }


            }catch(error) {
                console.error("error fetching data", error);
            }
        }
    };


    const handleDelete = (postId) => {
        if(localStorage.getItem('searchType') === 'station') {
            try {
                const response = axios.delete("http://localhost:8080/stationPosts/" + postId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

            } catch (error) {
                console.error("error deleting data", error);
            }
        }
        else {
            try {
                const response = axios.delete("http://localhost:8080/routePosts/" + postId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

            } catch (error) {
                console.error("error deleting data", error);
            }
        }
    };

    const handleEdit = (postId) => {
        localStorage.setItem('postEditId', postId);
        navigation('/post_edit');
    };

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
        if(!routeDoesNotExist) {
            if (buttonPressed === 1)
                localStorage.setItem('buttonPressed', 'review');
            else
                localStorage.setItem('buttonPressed', 'info');

            navigation("/post_input")
        }
    };

    const determineId = (post) => {
        if(localStorage.getItem('searchType') === 'station')
            return post.idStationPost;
        else
            return post.idRoutePost;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {hour: '2-digit', minute: '2-digit'};
        return date.toLocaleTimeString([], options);
    };

    const handleOperatorSelect = (item) => {
        setSelectedOperator(item);
        localStorage.setItem('selectedOperatorName', item);
        setIsDropdown(false);
    }
    const toggleDropdown = () => {
        setIsDropdown(!isDropdown);
    };

    return (
        <div className={styles.postsSpace}>
            <div className={styles.buttons}>
                <button className={reviewButtonStyle} onClick={handleReview}>Review</button>
                <button className={infoButtonStyle} onClick={handleInfo}>Info</button>
                { localStorage.getItem('searchType') === 'route' &&
                    <div>
                        <div className={styles.selectedItem} onClick={toggleDropdown}>
                            {selectedOperator || "no operator"}
                        </div>
                        {isDropdown && (
                            <div>
                                {operatorData.map(op => (
                                  <div key={op.idOperator} onClick={() => handleOperatorSelect(op.operator)} className={styles.operatorItem}>
                                      {op.operator}
                                  </div>
                                ))}
                            </div>
                        )}
                    </div>
                }
            </div>
            <div className={styles.posts}>
                {   routeDoesNotExist &&
                    <h2 className={styles.hTwo}>That route doesn't exist</h2>
                }
                { !routeDoesNotExist && posts.map(post => (
                    <div className={styles.post}>
                        <div className={styles.postHeader} key={determineId(post)}>
                            <span className={styles.headerText}>{post.user.username}</span>
                            {buttonPressed === 1 &&
                            <span className={styles.headerText}>{post.creationDate.split('T')[0]}</span>
                            }
                            {buttonPressed === 2 &&
                                <span className={styles.headerText}>{formatDate(post.creationDate)}</span>
                            }
                            {post.user.idUser === parseInt(localStorage.getItem('userId')) &&
                                <button className={styles.editPost} onClick={()=>handleEdit(determineId(post))}>Edit</button>
                            }
                            {(post.user.idUser === parseInt(localStorage.getItem('userId')) || (userType === "admin")) &&
                                <button className={styles.adminDelete} onClick={()=>handleDelete(determineId(post))}>Delete</button>
                            }
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