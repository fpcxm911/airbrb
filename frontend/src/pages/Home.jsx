import React from 'react';
import LogoutBtn from '../components/LogoutBtn';
import {
  useNavigate
} from 'react-router-dom';
import { IconButton } from '@mui/material';
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
      <IconButton><LogoutBtn /></IconButton>
    </div>
  );
}
