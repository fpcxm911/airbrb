import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import { Context, initialValue } from './context';

function App () {
  const [email, setEmail] = React.useState(initialValue.email);
  const [token, setToken] = React.useState(initialValue.token);
  const [loggedIn, setLoggedIn] = React.useState(initialValue.loggedIn);
  const getters = {
    email,
    token,
    loggedIn,
  }
  const setters = {
    setEmail,
    setToken,
    setLoggedIn,
  }
  return (
    <Context.Provider value={{ getters, setters, }}>
      <BrowserRouter>
        <Routes>
          < Route path='/' element={<Home/>} />
          < Route path='/register' element={<SignUp/>} />
          < Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
