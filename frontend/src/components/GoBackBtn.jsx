import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const HomeBtn = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={() => navigate(-1)}
        aria-label='goback'
        variant="outlined"
        sx={props.sx}
        >
        <ArrowBackOutlinedIcon />
      </IconButton>
    </>
  );
}

export default HomeBtn;
