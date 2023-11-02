import * as React from 'react';
import { useContext, Context } from '../context';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn (props) {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = () => {
    setters.setEmail(null);
    setters.setToken(null);
    setters.setLoggedIn(false);
    console.log('context cleared');
    navigate('/');
  };

  const buttonStyles = {
    fontSize: props.size,
  };

  return (
    <>
      <IconButton
        disabled={!getters.loggedIn}
        onClick={handleLogout}
        aria-label='logout'
        variant="outlined"
        color='error'
        >
        <LogoutIcon sx={buttonStyles} />
      </IconButton>
    </>
  );
}
