import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataAset from './pages/DataAset';
import Users from './pages/Users';
import AddAssets from './pages/AddAssets';
import Roles from './pages/Roles';
import AddRole from './pages/AddRole';
import Master from './pages/Master';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/dataaset' element={<DataAset/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/role' element={<Roles/>}/>
        <Route path='/role/add/' element={<AddRole/>}/>
        <Route path='/dataaset/add' element={<AddAssets/>}/>
        <Route path='/master' element={<Master />}/>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;

