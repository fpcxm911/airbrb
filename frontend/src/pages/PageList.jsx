import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';
import HostedListing from '../pages/HostedListing';
import Login from '../pages/Login';
import EditListing from '../pages/EditListing';
import ListingDetail from './ListingDeatail';
import { Context, initialValue } from '../Context';
import Dashboard from './Dashboard';

const Pagelist = () => {
  const [listingsUpdate, setListingsUpdate] = React.useState(0);
  const [numberOfNights, setNumberOfNights] = React.useState(null);

  const updateListing = () => {
    setListingsUpdate(listingsUpdate + 1);
  };

  const [email, setEmail] = React.useState(initialValue.email);
  const [token, setToken] = React.useState(initialValue.token);
  const [loggedIn, setLoggedIn] = React.useState(initialValue.loggedIn);
  const getters = {
    email,
    token,
    loggedIn,
  };
  const setters = {
    setEmail,
    setToken,
    setLoggedIn,
  };

  return (
    <Context.Provider value={{ getters, setters }}>
      <Routes>
        <Route path="/" element={<Home numberOfNights= {numberOfNights} setNumberOfNights = {setNumberOfNights}/>}>
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/hosted"
          element={
            <HostedListing
              listingsUpdate={listingsUpdate}
              update={updateListing}
            />
          }
        >
          <Route
            path="edit/:id"
            element={<EditListing update={updateListing} />}
          />
        </Route>
        <Route path="listing/:id" element={<ListingDetail numberOfNights = {numberOfNights}/>} />
        <Route path="hosted/booking/:id" element={<Dashboard />} />
      </Routes>
    </Context.Provider>
  );
};

export default Pagelist;
