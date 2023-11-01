import React from 'react';
// import SignUp from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import HostedListing from './pages/HostedListing';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/register' element={<SignUp/>} />
        < Route path='/hosted' element={<HostedListing/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
