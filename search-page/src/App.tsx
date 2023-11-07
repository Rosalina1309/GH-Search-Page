import React from 'react';

import './App.css';
import SearchBar from './components/SearchBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './components/UserPage';




export default function App() {

    return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/userpage/:username" element={<UserPage />} />
       
        </Routes>
      </BrowserRouter>
    </div>

);

  
}


