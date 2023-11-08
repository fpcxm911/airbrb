import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, styled } from '@mui/material';
// import image2 from '../assets/1.jfif'
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
const ResonsiveImg = styled('img')({
  width: '100%',
  aspectRatio: '16 / 9'
})

export default function MyCarousels (props) {
  return (
    <Carousel sx={{ width: '100%', border: 'none' }} autoPlay stopAutoPlayOnHover duration={1200} swipe >
      {
          props.images.map((item, i) =>
          <Box sx={{ width: '100%' }} key={i}>
            <ResonsiveImg src={item} width={'100%'} />
          </Box>
          )
      }
    </Carousel>
  )
}
