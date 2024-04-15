import React from 'react';
import './App.css';
//components

//views
import Login from "./components/views/Login";
import Test from "./components/views/Test";

// routing
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
      <>
        <div>
          <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/test' element = {<Test/>}/>
          </Routes>
        </div>
      </>
  );
}

export default App;