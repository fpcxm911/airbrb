import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';
import HostedListing from '../pages/HostedListing';
import Login from '../pages/Login';
import EditListing from '../pages/EditListing';

const Pagelist = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/hosted' element={<HostedListing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/edit' element={<EditListing />} />
      <Route path='/edit/:id' element={<EditListing />} />
    </Routes>
  );
};

export default Pagelist;
