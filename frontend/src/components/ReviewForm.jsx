import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, styled, Typography, Grid } from '@mui/material';
import { parseISO, format } from 'date-fns';
import HoverRating from './HoverRating';
import { apiCallBodyAuthen } from '../pages/Helper';
const CommentTextArea = styled('textarea')({
  resize: 'none'
})

export default function ReviewForm (props) {
  const [option, setOption] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [value, setValue] = React.useState(4);
  const [hover, setHover] = React.useState(-1);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(option);
    console.log(comment);
    console.log(value);
    const res = apiCallBodyAuthen(`listings/${props.listingId}/review/${option}`, localStorage.getItem('token'), {
      review: {
        userEmail: localStorage.getItem('email'),
        bookingId: option,
        rating: value,
        comment,
        date: new Date()
      }
    }, 'PUT')
    if (res.error) {
      console.log('123');
      props.setErrorMessage({ title: 'Error', body: res.error });
      props.setShowModal(true);
    } else {
      setOption('');
      setComment('');
      setValue(4);
      props.setNewComment(props.newComment + 1);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" color="text.primary">
        Select your booking to review
      </Typography>
      <FormControl sx={{ my: 1 }} fullWidth>
        <InputLabel id="bookings-option">
          Your Bookings
        </InputLabel>
        <Select
          labelId="bookings-option"
          label="Your Booking"
          id="demo-simple-select-helper"
          onChange={handleChange}
          value={option}
          name="select"
          required
        >
          {props.bookings.map((booking, index) => (
            <MenuItem key={index} value={booking.id} disabled={booking.status !== 'accepted'}>
              <em>{`From ${format(
                parseISO(booking.dateRange.start),
                'MM/dd/yyyy'
              )} To ${format(
                parseISO(booking.dateRange.end),
                'MM/dd/yyyy'
              )}`}</em>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Only accecpted booking could be reviewed</FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <Typography variant="h6" color="text.primary">
          Give your comment
        </Typography>
        <CommentTextArea rows={5} sx={{ my: 1 }} name='comment' value = {comment} required onChange={(e) => setComment(e.target.value)}/>
      </FormControl>
        <Grid item sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Rate your booking
          </Typography>
          <HoverRating value={value} setValue = {setValue} hover={hover} setHover = {setHover}/>
        </Grid>
      <Button type="submit" fullWidth variant="contained">
        Comment
      </Button>
    </Box>
  );
}
