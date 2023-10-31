import React from 'react';
// import SignUp from './pages/Register';
import {
  useNavigate
} from 'react-router-dom';
export default function Home () {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {
        navigate('./register')
      }}>
        Sign up
      </button>
    </div>
  );
}
