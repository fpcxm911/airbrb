import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ErrorDialog from '../components/ErrorPopup';
import Avatar from '@mui/material/Avatar';
import { EMAIL_REGEX, apiCallPostNoAuthen } from './Helper'
import { Typography } from '@mui/material';

export default function Login () {
  const [showLoginModal, setLoginModal] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showErrModal, setShowErrModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();
  const closeModal = () => {
    setShowErrModal(false);
  }

  // close modal when closed
  const returnHome = () => {
    setLoginModal(false);
    navigate('/');
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (validLoginInput()) {
      const res = await apiCallPostNoAuthen('user/auth/login', {
        email,
        password
      });
      if (res.error) {
        setErrorMessage({ title: 'Please Try Again', body: res.error });
        setShowErrModal(true);
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', email);
        setLoginModal(false);
        navigate('/');
      }
    }
  };

  const validLoginInput = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage({ title: 'Invalid Email', body: 'Enter a valid email.' });
      setShowErrModal(true);
      return false;
    }
    if (password.length === 0) {
      setErrorMessage({ title: 'Invalid Password', body: 'Please enter your password.' });
      setShowErrModal(true);
      return false;
    }
    setShowErrModal(false);
    return true;
  }

  return (
      <React.Fragment>
        <Dialog open={showLoginModal} onClose={returnHome} PaperProps={{ sx: { borderRadius: 6 } }}>
          <IconButton
            onClick={returnHome}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            aria-label='close'>
              <CloseIcon />
          </IconButton>
          <DialogContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component='h1' variant='h5'>
              Welcome Back
            </Typography>
            <DialogContentText>
              Please enter your email address and password.
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              margin='dense'
              label='Email Address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin='dense'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={returnHome}>Cancel</Button>
            <Button onClick={handleLoginForm}>Login</Button>
          </DialogActions>
          {showErrModal && (<ErrorDialog close = {closeModal} content = {errorMessage} />)}
        </Dialog>
      </React.Fragment>
  );
}
