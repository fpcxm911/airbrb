import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { CardMedia } from '@mui/material';
// import image2 from '../assets/1.jfif'
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
export default function MyCarousels (props) {
  return (
    <Carousel sx={{ width: '100%' }} autoPlay stopAutoPlayOnHover duration={1200} swipe >
      {
          props.images.map((item, i) =>
          <div key = {i}>
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: '56.25%',
              }}
              image={item}
            />
            </div>
          )
      }
    </Carousel>
  )
}
