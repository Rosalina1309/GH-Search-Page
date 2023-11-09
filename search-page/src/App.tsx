import React from 'react';

import './App.css';
import SearchBar from './components/SearchBar';
import {  Routes, Route, HashRouter } from 'react-router-dom';
import UserPage from './components/UserPage';


 

export default function App() {

    return (
    
      <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/userpage/:username" element={<UserPage />} />
       
        </Routes>
      </HashRouter>
    </div>

);

  
}


