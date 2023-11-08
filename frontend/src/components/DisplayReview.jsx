import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Typography, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { calculateAverageRating } from '../pages/Helper';
import { parseISO, format } from 'date-fns';
// import image2 from '../assets/1.jfif'
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

// const convertPrecision = (number) => {
//   return Math.round(number * 10) / 10;
// };

// const calculateAverageRating = (listing) => {
//   const sum = listing.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
//   return convertPrecision(sum / listing.reviews.length)
// };

function stringToColor (string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar (name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function DisplayReview (props) {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <StarBorderIcon sx={{ fontSize: '70px', mr: 2 }} />
        <Typography variant="h2" color="text.primary" paragraph>
          {calculateAverageRating(props.listing)}
        </Typography>
      </Grid>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        align="center"
        paragraph
      >
        Slide to view other reviews
      </Typography>

      <Carousel
        sx={{ width: '100%', mb: 10 }}
        duration={500}
        swipe
        indicators={false}
        autoPlay={false}
        cycleNavigation={false}
        animation="slide"
      >
        {props.listing.reviews.map((item, i) => (
          <Box key={i} height={'180px'}>
            <Grid container alignItems={'center'} sx={{ mb: 2 }}>
              <Avatar {...stringAvatar(item.name)} />
              <Typography variant="body2" color={'text.primary'} sx={{ ml: 1 }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid container minheight={'170px'}>
              <Grid container>
                <Rating
                  value={item.rating}
                  readOnly
                  precision={0.1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {' '}
                  {format(parseISO(item.date), 'do MMMM yyyy')}
                </Typography>
              </Grid>
              <Typography
                variant="body2"
                sx={{
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  mt: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.comment}
              </Typography>
            </Grid>
          </Box>
        ))}
      </Carousel>
    </>
  );
}
