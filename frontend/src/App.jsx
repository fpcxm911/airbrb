import React from 'react';
// import SignUp from './pages/Register';
import SignUp from './pages/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App () {
  return (
    < BrowserRouter>
      < Routes>
        < Route path='/register' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
