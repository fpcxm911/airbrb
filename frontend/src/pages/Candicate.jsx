import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import NavAirbrb from '../components/NavAirbrb';
import MyCarousels from '../components/MyCarousels';
import { Divider, Grid } from '@mui/material';
import Icon from '@mdi/react';
import { mdiWashingMachine, mdiMicrowave, mdiWifi } from '@mdi/js';
import DisplayReview from '../components/DisplayReview';

export default function Candicate () {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <NavAirbrb/>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 1 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Australian House
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <MyCarousels />
        <Typography
          variant="subtitle1"
          align="start"
          color="text.secondary"
          sx={{ pt: 5 }}
          gutterBottom
        >
          Address : 1/101 Kensington Street, Kensington, NSW
        </Typography>
        <Typography variant="subtitle1" align="start" color="text.secondary" sx={{ pb: 3 }}>
          Property type : House
        </Typography>
        <Divider/>
          <Typography variant="h5" align="start" color="text.primary" sx={{ py: 3 }}>
            $19,086.34 AUD
          </Typography>
        <Divider/>
        <Typography variant="h6" align="start" sx={{ pt: 3 }} color="text.primary">
        What this place offers
          </Typography>
        <Grid container alignItems={'center'} sx={{ pt: 3 }}>
          <Icon path={mdiWifi} size={2} />
          <Typography variant="subtitle2" align="start" sx={{ pl: 3 }} color="text.secondary">
            Wifi description
          </Typography>
        </Grid>
        <Grid container alignItems={'center'} sx={{ pt: 3 }}>
          <Icon path={mdiMicrowave} size={2} />
          <Typography variant="subtitle2" align="start" sx={{ pl: 3 }} color="text.secondary">
            Oven description
          </Typography>
        </Grid>
        <Grid container alignItems={'center'} sx={{ pt: 3 }}>
          <Icon path={mdiWashingMachine} size={2} />
          <Typography variant="subtitle2" align="start" sx={{ pl: 3 }} color="text.secondary">
            Washing Machine description
          </Typography>
        </Grid>
        <Divider sx={{ my: 3 }}/>
          <DisplayReview/>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
