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
  resize: 'none',
});

const ReviewForm = (props) => {
  // usestate to record the booking user seleted to review
  const [option, setOption] = React.useState('');
  // usestate to record the comment user typed
  const [comment, setComment] = React.useState('');
  // usestate to record the rating user give, initially it is 4 star
  const [value, setValue] = React.useState(4);
  // usestate to record hover state
  const [hover, setHover] = React.useState(-1);

  // set option when it change
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  // handle user submit review
  const handleSubmit = (event) => {
    event.preventDefault();
    const res = apiCallBodyAuthen(
      `listings/${props.listingId}/review/${option}`,
      localStorage.getItem('token'),
      {
        review: {
          userEmail: localStorage.getItem('email'),
          bookingId: option,
          rating: value,
          comment,
          date: new Date(),
        },
      },
      'PUT'
    );
    if (res.error) {
      props.toastError(res.error);
    } else {
      // reset usestate / form after it submit
      setOption('');
      setComment('');
      setValue(4);
      // update usestate to indicate there is a new comment
      props.setNewComment(props.newComment + 1);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant='h6' color='text.primary'>
        Select your booking to review
      </Typography>
      <FormControl sx={{ my: 1 }} fullWidth>
        <InputLabel id='bookings-option'>Your Bookings</InputLabel>
        <Select
          labelId='bookings-option'
          label='Your Booking'
          id='bookings-selector'
          onChange={handleChange}
          value={option}
          name='select'
          required
        >
          {props.bookings.map((booking, index) => (
            <MenuItem
              key={index}
              value={booking.id}
              disabled={booking.status !== 'accepted'}
            >
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
        <FormHelperText>
          Only accecpted booking could be reviewed
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <Typography variant='h6' color='text.primary'>
          Give your comment
        </Typography>
        <CommentTextArea
          id='comment-textarea'
          rows={5}
          sx={{ my: 1 }}
          name='comment'
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
      </FormControl>
      <Grid item sx={{ mb: 4 }}>
        <Typography variant='h6' color='text.primary' gutterBottom>
          Rate your booking
        </Typography>
        <HoverRating
          value={value}
          setValue={setValue}
          hover={hover}
          setHover={setHover}
        />
      </Grid>
      <Button type='submit' fullWidth variant='contained' name='submit'>
        Comment
      </Button>
    </Box>
  );
};

export default ReviewForm;
