import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import HostedListing from './pages/HostedListing';
import Login from './pages/Login';
import EditListing from './pages/EditListing';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/register' element={<SignUp/>} />
        < Route path='/hosted' element={<HostedListing/>} />
      < Route path='/login' element={<Login/>} />
        < Route path='/edit' element={<EditListing/>} />
        < Route path='/edit/:id' element={<EditListing/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
