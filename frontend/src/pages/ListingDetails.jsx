import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
// import { apiCallGetAuthen, apiCallBodyAuthen } from './Helper';
// import ErrorDialog from '../components/ErrorPopup';
// import Listcreate from './Listcreate';
// import { useNavigate, Outlet } from 'react-router-dom';
// import ListPublish from './ListPublish';
import NavAirbrb from '../components/NavAirbrb';
// import ListingCard from '../components/ListingCard';
// TODO remove, this demo shouldn't need to reset the theme.
import MyCarousels from '../components/MyCarousels';
import { Typography } from '@mui/material';
export default function ListingDetails () {
  return (
    <div>
      <CssBaseline />
      <NavAirbrb/>
      <Grid sx={{ px: 40 }}>
        <Typography variant='h5'>
          Australian House
        </Typography>
        <Grid container justifyContent={'center'} sx={{ mt: 5 }}>
          <MyCarousels/>
        </Grid>
      </Grid>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* <Outlet /> */}
    </div>
  );
}
