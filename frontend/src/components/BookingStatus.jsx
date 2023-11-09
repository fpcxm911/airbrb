import React from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import { parseISO, format } from 'date-fns';

export default function BookingStatus (props) {
  return (
    <>
      {props.bookings.length
        ? (
        <>
          <Grid container>
            <Typography variant="h6" color="text.primary">
              Your bookings summaries
            </Typography>
          </Grid>
          {props.bookings.map((item, i) => (
            <Grid
              container
              key={i}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid item sx={{ my: 2 }}>
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
          <Divider />
        </>
          )
        : (
        <>
        </>
          )}
    </>
  );
}
