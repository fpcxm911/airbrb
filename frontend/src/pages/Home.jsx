import React from 'react';
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
      <button onClick={() => {
        navigate('./login')
      }}>
        Login
      </button>
      <button onClick={() => {
        navigate('./hosted')
      }}>
        Hosted
      </button>
    </div>
  );
}
