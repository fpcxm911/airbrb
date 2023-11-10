import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import BookingDisplay from './BookingDisplay'
import NavAirbrb from './NavAirbrb';
import Copyright from './Copyright';
import ErrorDialog from './ErrorPopup';
import { apiCallGetAuthen } from '../pages/Helper';
import { useContext, Context } from '../Context';
import { useParams } from 'react-router-dom';

export default function Dashboard () {
  const { getters, setters } = useContext(Context);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [allBookings, setAllbookings] = React.useState([]);
  const [bookingUpdate, setBookingUpdate] = React.useState(0);
  const params = useParams();

  const updateBookings = () => {
    setBookingUpdate(bookingUpdate + 1);
  };
  const pendingBookings = (bookings) => {
    const pendings = bookings.filter(
      (x) =>
        x.listingId === params.id && x.status === 'pending'
    );
    return pendings;
  }

  const bookingHistories = (bookings) => {
    const histories = bookings.filter(
      (x) =>
        x.listingId === params.id && x.status !== 'pending'
    );
    return histories;
  }

  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setters.setToken(token);
      setters.setEmail(email);
      setters.setLoggedIn(true);
      console.log(getters.token);
    }
  }, []);

  React.useEffect(async () => {
    if (getters.loggedIn) {
      const bookingRes = await apiCallGetAuthen(
        'bookings',
        localStorage.getItem('token')
      );
      if (bookingRes.error) {
        setErrorMessage({ title: 'Error', body: bookingRes.error });
        setShowModal(true);
      } else {
        setAllbookings(bookingRes.bookings);
      }
    } else {
      setAllbookings([]);
    }
  }, [getters.loggedIn]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <CssBaseline />
          <NavAirbrb/>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BookingDisplay data = {pendingBookings(allBookings)} current = {true} setBookingUpdate={updateBookings}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <BookingDisplay data = {bookingHistories(allBookings)} current = {false}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
        {showModal && (
              <ErrorDialog
                close={() => setShowModal(false)}
                content={errorMessage}
              />
        )}
      </Box>
    </>
  );
}
