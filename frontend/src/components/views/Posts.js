import React, {useState} from 'react';

import styles from '../../css/views/Posts.module.css';
import PostsHeader from "../PostsHeader";
import PostsSpace from "../PostsSpace";

function Posts() {


    return (
        <div className={styles.PostsDiv}>

            {/*obok Postheadera*/}
            {/*<div>*/}
            {/* add post*/}
            {/* user data */}
            {/*</div>*/}

            <PostsHeader/>

            {/*Wewnątrz Posts space!!!*/}
            {/*<div>*/}
            {/*    div for buttons to switch views*/}
            {/*    <button></button>*/}
            {/*    <button></button>*/}
            {/*</div>*/}

            <PostsSpace/>

        </div>
    );
}

export default Posts;