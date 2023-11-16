import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, styled } from '@mui/material';
const ResonsiveImg = styled('img')({
  width: '100%',
  aspectRatio: '16 / 9'
})

export default function MyCarousels (props) {
  return (
    <Carousel sx={{ width: '100%', aspectRatio: '16 / 9' }} autoPlay stopAutoPlayOnHover duration={1200} swipe navButtonsAlwaysVisible cycleNavigation={false}>
      {
          props.images.map((item, i) =>
          <Box sx={{ width: '100%' }} key={i}>
            <ResonsiveImg src={item} />
          </Box>
          )
      }
    </Carousel>
  )
}
