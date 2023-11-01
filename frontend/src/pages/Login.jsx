import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Login () {
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = React.useState(false);

  // const returnHome = () => {
  //   setOpenLogin(false);
  //   navigate('/');
  // }

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  }

  const handleLoginForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    setOpenLogin(false);
    navigate('/');
  }

  return (
    <React.Fragment>
      <div>
        <h1>Login</h1>
        <Button onClick={() => {
          navigate('/');
        }}>
          Home
        </Button>
      </div>
      <Button variant="outlined" onClick={handleClickOpenLogin}>
        Open form dialog
      </Button>
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make booking, please enter your email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Cancel</Button>
          <Button onClick={handleLoginForm}>Login</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}
