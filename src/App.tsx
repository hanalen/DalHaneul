import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { CommonProvider } from './Providers/CommonProvider';

function App() {
  return (
    <div className="text-sm">
      <BrowserRouter>
        <CommonProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </CommonProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
