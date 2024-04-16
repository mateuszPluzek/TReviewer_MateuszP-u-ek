import React from 'react';
import './App.module.css';
//components

//views
import Login from "./components/views/Login";
import Test from "./components/views/Test";
import Register from "./components/views/Register";
import SearchView from "./components/views/SearchView";
import styles from "./App.module.css"

// routing
import {Route, Routes} from 'react-router-dom';

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
          </Routes>
        </div>
      </>
  );
}

export default App;