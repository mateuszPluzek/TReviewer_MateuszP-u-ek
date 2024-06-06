import React, {useState} from 'react';

import styles from '../../css/views/Posts.module.css';
import PostsHeader from "../PostsHeader";
import PostsSpace from "../PostsSpace";

function Posts() {

    // check if admin

    return (
        <div className={styles.PostsDiv}>

            <PostsHeader/>

            <PostsSpace/>

        </div>
    );
}

export default Posts;