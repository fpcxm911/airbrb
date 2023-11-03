import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiCallPostAuthen } from '../pages/Helper';

const LogoutBtn = (props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await apiCallPostAuthen('user/auth/logout', localStorage.getItem('token'), {});
    if (res.error) {
      console.log(res.error);
    } else {
      // clear token in local storage and props
      localStorage.clear();
      props.setToken(null);
      navigate('/');
    }
  };

  const buttonStyles = {
    fontSize: props.size,
  };

  return (
    <>
      <IconButton
        disabled={localStorage.getItem('email') === null}
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

export default LogoutBtn;
