import React from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Grid, Typography, Box } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { calculateAverageRating } from '../pages/Helper';
// import { parseISO, format } from 'date-fns';
import { apiCallGetAuthen } from '../pages/Helper';
import { Typography, Divider, Grid } from '@mui/material';
import { parseISO, format } from 'date-fns';

export default function BookingStatus (props) {
  const [listBookings, setListBookings] = React.useState([]);

  React.useEffect(async () => {
    const res = await apiCallGetAuthen(
      'bookings',
      localStorage.getItem('token')
    );
    if (res.error) {
      props.setErrorMessage({ title: 'Error', body: res.error });
      props.setShowModal(true);
    } else {
      const myBookings = res.bookings.filter(
        (x) =>
          x.owner === localStorage.getItem('email') &&
          x.listingId === props.listingId
      );
      setListBookings(myBookings);
      // const res2 = await apiCallBodyAuthen(`bookings/new/${props.listingId}`, localStorage.getItem('token'), {
      //   dateRange: {},
      //   totalPrice: 800
      // }, 'POST');
      // if (res2.error) {
      //   props.setErrorMessage({ title: 'Error', body: res2.error });
      //   props.setShowModal(true);
      // }
    }
  }, []);
  console.log(listBookings);
  return (
    <>
      {listBookings.length
        ? (
        <>
          <Grid container>
            <Typography variant="h6" color="text.primary">
              Your bookings summaries
            </Typography>
          </Grid>
          {listBookings.map((item, i) => (
            <Grid
              container
              key={i}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid item direction={'column'} sx={{ my: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {`From ${format(
                    parseISO(item.dateRange.start),
                    'MM/dd/yyyy'
                  )} To ${format(parseISO(item.dateRange.end), 'MM/dd/yyyy')}`}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Status: {item.status}
                </Typography>
              </Grid>

              <Typography variant="subtitle1" color="text.secondary">
                ${item.totalPrice}
              </Typography>
            </Grid>
          ))}
        </>
          )
        : (
        <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
          You do not have any bookings yet
        </Typography>
          )}
      <Divider />
    </>
  );
}
