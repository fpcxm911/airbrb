import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const HomeBtn = (props) => {
  const navigate = useNavigate();

  const buttonStyles = {
    fontSize: props.size,
  };

  return (
    <>
      <IconButton
        onClick={() => navigate(-1)}
        aria-label='home'
        variant="outlined"
        >
        <ArrowBackOutlinedIcon sx={buttonStyles} />
      </IconButton>
    </>
  );
}

export default HomeBtn;
