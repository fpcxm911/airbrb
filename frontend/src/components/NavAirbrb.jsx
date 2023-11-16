import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useNavigate } from 'react-router-dom';
import { apiCallBodyAuthen, checkLogin } from '../pages/Helper';
import { useContext, Context } from '../Context';

export default function NavAirbrb () {
  const { setters } = useContext(Context);
  const handleLogout = async () => {
    const res = await apiCallBodyAuthen(
      'user/auth/logout',
      localStorage.getItem('token'),
      {},
      'POST'
    );
    if (res.error) {
      console.error(res.error);
    } else {
      // clear token in local storage and props
      localStorage.clear();
      setters.setToken(null);
      setters.setEmail(null);
      setters.setLoggedIn(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            AirBrb
          </Typography>
          {checkLogin() && (
            <nav>
              <Link
                variant='button'
                name='hosted-link'
                color='text.primary'
                sx={{ my: 1, mx: 1.5, cursor: 'pointer' }}
                onClick={() => {
                  navigate('/hosted');
                }}
              >
                Hosted listings
              </Link>
              <Link
                variant='button'
                name='all-listings-link'
                color='text.primary'
                sx={{ my: 1, mx: 1.5, cursor: 'pointer' }}
                onClick={() => {
                  navigate('/');
                }}
              >
                All listings
              </Link>
            </nav>
          )}
          {!checkLogin() && (
            <Button
              name='register-btn'
              variant='outlined'
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </Button>
          )}
          {!checkLogin() && (
            <Button
              name='login-btn'
              variant='contained'
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          )}
          {checkLogin() && (
            <Button
              name='logout-btn'
              variant='contained'
              sx={{ my: 1, mx: 1.5 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
