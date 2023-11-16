import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Statistic from '../components/Statistic';
import BookingDisplay from '../components/BookingDisplay';
import NavAirbrb from '../components/NavAirbrb';
import Copyright from '../components/Copyright';
import { apiCallGetAuthen } from './Helper';
import { useContext, Context } from '../Context';
import { useParams } from 'react-router-dom';
import differenceInDays from 'date-fns/differenceInDays';
import EarningImg from '../assets/earning.png';
import CanlendarImg from '../assets/calendar.png';
import { ToastContainer, toast } from 'react-toastify';
import NoPermission from './NoPermission';

export default function Dashboard () {
  const { getters, setters } = useContext(Context);
  const [allBookings, setAllbookings] = React.useState([]);
  const [bookingUpdate, setBookingUpdate] = React.useState(0);
  const [postedOn, setPublishedOn] = React.useState('');
  const params = useParams();

  const toastError = (msg) => {
    toast.error(msg);
  }

  const updateBookings = () => {
    setBookingUpdate(bookingUpdate + 1);
  };

  const pendingBookings = (bookings) => {
    const pendings = bookings.filter(
      (x) => x.listingId === params.id && x.status === 'pending'
    );
    return pendings;
  };
  const currentYear = () => {
    return new Date().getFullYear();
  }

  const isCurrentYear = (isoTime) => {
    const date = new Date(isoTime);
    const yearFromIsoTime = date.getFullYear();
    const currentYear = new Date().getFullYear();
    return yearFromIsoTime === currentYear;
  }

  const daysBetweenDates = (dateRange) => {
    const isoDate1 = dateRange.start;
    const isoDate2 = dateRange.end;
    const date1 = new Date(isoDate1);
    const date2 = new Date(isoDate2);
    return differenceInDays(date2, date1);
  }

  const daysFromNow = (startTime) => {
    const currentDate = new Date();
    const startDate = new Date(startTime);
    return differenceInDays(currentDate, startDate);
  }

  const calculateProfit = (bookings) => {
    const acceptedBookings = bookings.filter(
      (x) =>
        x.listingId === params.id && x.status === 'accepted' && isCurrentYear(x.dateRange.start)
    );
    const totalProfit = acceptedBookings.reduce((accumulator, booking) => accumulator + booking.totalPrice, 0);
    return totalProfit
  };

  const calculateDays = (bookings) => {
    const acceptedBookings = bookings.filter(
      (x) =>
        x.listingId === params.id && x.status === 'accepted' && isCurrentYear(x.dateRange.start)
    );
    const totalDays = acceptedBookings.reduce((accumulator, booking) => accumulator + daysBetweenDates(booking.dateRange), 0);
    return totalDays;
  };

  const bookingHistories = (bookings) => {
    const histories = bookings.filter(
      (x) => x.listingId === params.id && x.status !== 'pending'
    );
    return histories;
  };

  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setters.setToken(token);
      setters.setEmail(email);
      setters.setLoggedIn(true);
    }
  }, []);

  React.useEffect(async () => {
    if (getters.loggedIn) {
      const bookingRes = await apiCallGetAuthen(
        'bookings',
        localStorage.getItem('token')
      );
      if (bookingRes.error) {
        toastError(bookingRes.error);
      } else {
        setAllbookings(bookingRes.bookings);
      }
    } else {
      setAllbookings([]);
    }
  }, [getters.loggedIn, bookingUpdate]);

  React.useEffect(async () => {
    const res = await apiCallGetAuthen(`listings/${params.id}`);
    if (res.error) {
      toastError(res.error);
    } else {
      setPublishedOn(res.listing.postedOn)
    }
  }, []);

  return (
    <>
      {getters.loggedIn
        ? (
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
            <NavAirbrb />
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={4} >
                    <Statistic
                        title={`${currentYear()} Booked Days`}
                        content={`${calculateDays(allBookings)} Days`}
                        id='booked-days'
                        icon={
                          <img
                            alt="icon"
                            src={CanlendarImg}
                            width={64}
                            height={64}
                          />
                        }
                      />
                </Grid>
                <Grid item xs={12} md={4} >
                    <Statistic
                        title={`${currentYear()} Total Earning`}
                        content={`$${calculateProfit(allBookings)}`}
                        id='total-earning'
                        icon={
                          <img
                            alt="icon"
                            src={EarningImg}
                            width={64}
                            height={64}
                          />
                        }
                      />
                </Grid>
                <Grid item xs={12} md={4} >
                    <Statistic
                        title="Days From Publishing"
                        content={`${daysFromNow(postedOn)} Days`}
                        id='published-days'
                        icon={
                          <img
                            alt="icon"
                            src={CanlendarImg}
                            width={64}
                            height={64}
                          />
                        }
                      />
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <BookingDisplay
                      data={pendingBookings(allBookings)}
                      current={true}
                      setBookingUpdate={updateBookings}
                      toastError={toastError}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <BookingDisplay
                      data={bookingHistories(allBookings)}
                      current={false}
                      toastError={toastError}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
          <ToastContainer
            position='top-center'
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss={false}
          />
        </Box>
          )
        : (
          <NoPermission />
          )}
    </>
  );
}
