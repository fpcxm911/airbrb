import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import image from '../assets/1.jfif'
// import image2 from '../assets/1.jfif'
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
export default function MyCarousels (props) {
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

    <Carousel sx={{ width: '100%' }}autoPlay stopAutoPlayOnHover duration={1200} swipe indicators={false} height={500}>
    {
        items.map((item, i) => <Item key={i} item={item} />)
    }
    </Carousel>
  )
}

function Item (props) {
  return (
        <Paper>
            <img src={image} alt="testimage" height={500} width={'100%'} />
        </Paper>
  )
}
