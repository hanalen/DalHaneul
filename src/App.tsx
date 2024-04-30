import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <div className="text-sm">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
