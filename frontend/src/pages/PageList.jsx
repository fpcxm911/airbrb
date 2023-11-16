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
  // usestate to record whether there should be a listing update fetch in hosted page
  const [listingsUpdate, setListingsUpdate] = React.useState(0);
  // usestate to record the number of days if user search by date on home page
  const [numberOfNights, setNumberOfNights] = React.useState(null);

  // set update listing
  const updateListing = () => {
    setListingsUpdate(listingsUpdate + 1);
  };

  // usecontext state store token, email and login status
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
        <Route
          path='/'
          element={
            <Home
              numberOfNights={numberOfNights}
              setNumberOfNights={setNumberOfNights}
            />
          }
        >
          <Route path='register' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route
          path='/hosted'
          element={
            <HostedListing
              listingsUpdate={listingsUpdate}
              update={updateListing}
            />
          }
        >
          <Route
            path='edit/:id'
            element={<EditListing update={updateListing} />}
          />
        </Route>
        <Route
          path='listing/:id'
          element={<ListingDetail numberOfNights={numberOfNights} />}
        />
        <Route path='hosted/booking/:id' element={<Dashboard />} />
      </Routes>
    </Context.Provider>
  );
};

export default Pagelist;
