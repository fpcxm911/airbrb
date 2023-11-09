// TODO eric signup modal needs to satisfy 2.1.4 show navbar in the background
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX, apiCallPostNoAuthen } from './Helper'
import ErrorDialog from '../components/ErrorPopup';
import { useContext, Context } from '../Context';

export default function SignUp () {
  const { setters } = useContext(Context);
  const [openRegister, setOpenRegister] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeModal = () => {
    setShowModal(false);
  };
  const navigate = useNavigate();
  // handle close
  const goBackMain = () => {
    setOpenRegister(false);
    navigate('/');
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (validRegisterForm(data)) {
      const res = await apiCallPostNoAuthen('user/auth/register', {
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name')
      });
      if (res.error) {
        setErrorMessage({ title: 'Error', body: res.error });
        setShowModal(true);
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', data.get('email'));
        setters.setToken(res.token);
        setters.setEmail(data.get('email'));
        setters.setLoggedIn(true);
        setOpenRegister(false)
        navigate('/');
      }
      // Handle the response from the API
    }
  };

  const validRegisterForm = (data) => {
    if (!EMAIL_REGEX.test(data.get('email'))) {
      setErrorMessage({ title: 'Invalid Email', body: 'Please use a valid email address.' });
      setShowModal(true);
      return false;
    } else if (!USERNAME_REGEX.test(data.get('name'))) {
      setErrorMessage({ title: 'Invalid Name', body: 'Usernames must be 3-20 characters long and can contain only letters, numbers, and underscores.' });
      setShowModal(true);
      return false;
    } else if (!PASSWORD_REGEX.test(data.get('password'))) {
      setErrorMessage({ title: 'Invalid Password', body: 'Passwords must be at least 8 characters long and include a letter, a digit, and may contain special characters.' });
      setShowModal(true);
      return false;
    } else if (data.get('password') !== data.get('confirm')) {
      setErrorMessage({ title: 'Password Mismatch', body: 'Passwords do not match. Please try again.' });
      setShowModal(true);
      return false;
    }
    setShowModal(false);
    return true;
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={goBackMain}
        open={openRegister}
        PaperProps={{ sx: { borderRadius: 6 } }}
      >
        <IconButton
          aria-label="close"
          onClick={goBackMain}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='register-email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='register-name'
                  label='User Name'
                  name='name'
                  autoComplete='name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='register-password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirm'
                  label='Confirm Password'
                  type='password'
                  id='confirm-password'
                  autoComplete='confirm-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </DialogContent>
        {showModal && (<ErrorDialog close = {closeModal} content = {errorMessage} />)}
      </Dialog>
    </React.Fragment>
  );
}
