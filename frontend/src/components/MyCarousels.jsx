import React from 'react';
import Carousel from 'react-material-ui-carousel'
import image from '../assets/1.jfif'
import { CardMedia } from '@mui/material';
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

    <Carousel sx={{ width: '100%' }} autoPlay stopAutoPlayOnHover duration={1200} swipe indicators={false}>
    {
        items.map((item, i) => <Item key={i} item={item} />)
    }
    </Carousel>
  )
}

function Item (props) {
  return (
        <>

          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            image={image}
          />
        </>

  )
}
