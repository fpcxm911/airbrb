import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/register' element={<SignUp/>} />
        < Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
