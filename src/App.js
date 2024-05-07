import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataAset from './pages/DataAset';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/dataaset' element={<DataAset/>}/>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;
