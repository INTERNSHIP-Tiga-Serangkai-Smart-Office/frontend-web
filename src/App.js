import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataAset from './pages/DataAset';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/dataaset' element={<DataAset/>}/>
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;

