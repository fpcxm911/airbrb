import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function Login () {
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = React.useState(false);

  // return home when login is closed
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleLoginForm = (e) => {
    // TODO
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.currentTarget);
    console.log(data);
    setOpenLogin(false);
    navigate('/');
  };

  return (
    <>
      <React.Fragment>
        <Button variant='outlined' onClick={handleClickOpenLogin}>
          Login
        </Button>
        <Dialog open={openLogin} onClose={handleCloseLogin}>
          <IconButton
            onClick={handleCloseLogin}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            aria-label='close'>
              <CloseIcon />
          </IconButton>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To manage booking, please enter your email address and password.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogin}>Cancel</Button>
            <Button onClick={handleLoginForm}>Login</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
