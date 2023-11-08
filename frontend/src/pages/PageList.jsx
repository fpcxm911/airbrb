import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';
import HostedListing from '../pages/HostedListing';
import Login from '../pages/Login';
import EditListing from '../pages/EditListing';
import ListingDetail from './ListingDeatail';

const Pagelist = () => {
  const [listingsUpdate, setListingsUpdate] = React.useState(0);

  const updateListing = () => {
    setListingsUpdate(listingsUpdate + 1)
  };

  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='register' element={<SignUp/>} />
        <Route path='login' element={<Login/>} />
      </Route>
      <Route path='/hosted' element={<HostedListing listingsUpdate = {listingsUpdate} update = {updateListing}/>}>
        <Route path='edit' element={<EditListing />} />
        <Route path='edit/:id' element={<EditListing update = {updateListing} />} />
      </Route>
      <Route path='listing/:id' element={<ListingDetail />} />
    </Routes>
  );
};

export default Pagelist;
