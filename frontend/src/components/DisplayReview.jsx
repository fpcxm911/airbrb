import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Grid, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!'
    }
  ]

  return (
    <>
      <Grid container justifyContent={'center'}>
        <StarBorderIcon sx={{ fontSize: '70px', mr: 2 }}/>
        <Typography variant="h2" color="text.primary" paragraph>
          5.0
        </Typography>
      </Grid>

      <Carousel sx={{ width: '100%' }} autoPlay stopAutoPlayOnHover duration={1200} swipe indicators={false}>
        {
          items.map((item, i) => <Item key={i} item={item} />)
        }
      </Carousel>
    </>
  )
}

function Item (props) {
  return (
    <Grid>
      <Grid container alignItems={'center'} sx={{ mb: 2 }}>
        <Avatar {...stringAvatar('Haoxiang Zhang')}/>
        <Typography variant='body2' color={'text.primary'} sx={{ ml: 1 }}>
          Haoxiang Zhang
        </Typography>
      </Grid>
      <Grid container>
        <Rating
          value={3.3}
          readOnly
          precision={0.1}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }}
            fontSize="inherit" />} />
        <Typography variant="body2" sx={{ ml: 2 }}> 2023-09-24</Typography>
      </Grid>
      <Typography variant="body2" sx={{
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        mt: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
    </Grid>
  )
}
