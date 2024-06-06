import React from 'react';
import './App.module.css';
//components

//views
import Login from "./components/views/Login";
import Test from "./components/views/Test";
import Register from "./components/views/Register";
import SearchView from "./components/views/SearchView";
import Posts from "./components/views/Posts";

import styles from "./App.module.css"

// routing
import {Route, Routes} from 'react-router-dom';
import PostInput from "./components/views/PostInput";
import PostEdit from "./components/views/PostEdit";

function App() {
  return (
      <>
        <div className={styles.mainDiv}>
          <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/test' element = {<Test/>}/>
            <Route path = '/register' element = {<Register/>}/>
            <Route path = '/search' element = {<SearchView/>}/>
            <Route path = '/posts' element = {<Posts/>}/>
            <Route path = '/post_input' element = {<PostInput/>}/>
            <Route path = '/post_edit' element={<PostEdit/>}/>
          </Routes>
        </div>
      </>
  );
}

export default App;