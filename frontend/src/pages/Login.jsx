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
import Avatar from '@mui/material/Avatar';
import { EMAIL_REGEX, apiCallPostNoAuthen } from './Helper';
import { Typography, Box, Grid } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useContext, Context } from '../Context';

const Login = () => {
  // get context states setter
  const { setters } = useContext(Context);
  // usetate to decide whether the login modal should open or not
  const [open, setOpen] = React.useState(true);
  // usetate to store user email
  const [email, setEmail] = React.useState('');
  // usetate to store user password
  const [password, setPassword] = React.useState('');
  // usetate to record error message
  const [errorMessage, setErrorMessage] = React.useState('');

  const navigate = useNavigate();

  // close modal when closed
  const returnHome = () => {
    setOpen(false);
    navigate('/');
  };

  // handle login submit event
  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (validLoginInput()) {
      const res = await apiCallPostNoAuthen('user/auth/login', {
        email,
        password,
      });
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        // set token and email to localstorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', email);
        // set context state
        setters.setToken(res.token);
        setters.setEmail(email);
        setters.setLoggedIn(true);
        setOpen(false);
        navigate('/');
      }
    }
  };

  // validate the login details
  const validLoginInput = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Enter a valid email.');
      return false;
    }
    if (password.length === 0) {
      setErrorMessage('Please enter your password.');
      return false;
    }
    return true;
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={returnHome}
        PaperProps={{ sx: { borderRadius: 6 } }}
      >
        <IconButton
          onClick={returnHome}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#6699ff' }}>
            <LoginOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Welcome Back
          </Typography>
          <DialogContentText>
            Please enter your email address and password.
          </DialogContentText>
          <Box component='form' noValidate sx={{ mt: 2 }} width={'100%'}>
            <Grid
              container
              spacing={1}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  margin='dense'
                  label='Email Address'
                  type='email'
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoginForm(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin='dense'
                  label='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoginForm(e)}
                />
              </Grid>
            </Grid>
          </Box>
          <DialogContentText color='error'>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={returnHome}>Cancel</Button>
          <Button onClick={handleLoginForm} name='login'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Login;
