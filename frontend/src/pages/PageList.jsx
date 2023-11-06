import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';
import HostedListing from '../pages/HostedListing';
import Login from '../pages/Login';
import EditListing from '../pages/EditListing';

const Pagelist = () => {
  const [token, setToken] = React.useState(null);

  return (
    <Routes>
      <Route path='/' element={<Home token={token} setToken={setToken}/>} />
      <Route path='/register' element={<SignUp token={token} setToken={setToken}/>} />
      <Route path='/hosted' element={<HostedListing />} />
      <Route path='/login' element={<Login token={token} setToken={setToken}/>} />
      <Route path='/edit' element={<EditListing />} />
      <Route path='/edit/:id' element={<EditListing />} />
    </Routes>
  );
};

export default Pagelist;
