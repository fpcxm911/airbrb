import React from 'react';
import LogoutBtn from '../components/LogoutBtn';
import { useNavigate } from 'react-router-dom';
export default function Home (props) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate('./register');
        }}
      >
        Sign up
      </button>
      <button
        onClick={() => {
          navigate('./login');
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate('./hosted');
        }}
      >
        Hosted
      </button>
      <LogoutBtn token={props.token} setToken={props.setToken} />
    </div>
  );
}
