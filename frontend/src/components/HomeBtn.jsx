import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const HomeBtn = (props) => {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/');
  };

  const buttonStyles = {
    fontSize: props.size,
  };

  return (
    <>
      <IconButton
        onClick={returnHome}
        aria-label='home'
        variant="outlined"
        >
        <HomeOutlinedIcon sx={buttonStyles} />
      </IconButton>
    </>
  );
}

export default HomeBtn;
