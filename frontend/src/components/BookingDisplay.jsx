import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Pagination from '@mui/material/Pagination';
import { parseISO, format } from 'date-fns';
import { Button, Grid, TableContainer } from '@mui/material';
import { apiCallBodyAuthen } from '../pages/Helper';

export default function BookingDisplay (props) {
  // create usestate to record current page bookings for rendering and record the current page number
  const [renderList, setRenderLst] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  // calculate total page number base on all bookings, one page present 5 bookings
  const totalPage = Math.ceil(props.data.length / 5);
  // update pagenumber after user click the pagination
  const handlePageChange = (event, newPageNumber) => {
    setPageNum(newPageNumber);
  };

  // accpet booking
  const handleAccept = async (bookingId) => {
    const res = await apiCallBodyAuthen(
      `bookings/accept/${bookingId}`,
      localStorage.getItem('token'),
      {},
      'PUT'
    );
    if (res.error) {
      props.toastError(res.error);
    } else {
      // update state variable to responsive update the page after accept booking
      props.setBookingUpdate();
    }
  };

  // deny booking
  const handleDeny = async (bookingId) => {
    const res = await apiCallBodyAuthen(
      `bookings/decline/${bookingId}`,
      localStorage.getItem('token'),
      {},
      'PUT'
    );
    if (res.error) {
      props.toastError(res.error);
    } else {
      // update state variable to responsive update the page after accept booking
      props.setBookingUpdate();
    }
  };

  // set bookings to be rendered base on page number
  React.useEffect(() => {
    const start = (pageNum - 1) * 5;
    const end = pageNum * 5;
    const currentPage = props.data.slice(start, end);
    setRenderLst(currentPage);
  }, [pageNum, props.data]);
  return (
    <Grid width={'100%'}>
      <Title>{props.current ? 'Booking Request' : 'Booking History'}</Title>

      <TableContainer>
        <Table size='large'>
          <TableHead>
            <TableRow>
              <TableCell>Owner Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>
                {props.current ? 'Handle Request' : 'Booking Status'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='renderListContainer'>
            {renderList.map((booking, idx) => (
              <TableRow key={idx} className='bookingRow'>
                <TableCell>{booking.owner}</TableCell>
                <TableCell>
                  {format(parseISO(booking.dateRange.start), 'do MMMM yyyy')}
                </TableCell>
                <TableCell>
                  {format(parseISO(booking.dateRange.end), 'do MMMM yyyy')}
                </TableCell>
                <TableCell>{`$${booking.totalPrice}`}</TableCell>
                <TableCell>
                  {props.current
                    ? (
                    <Grid container>
                      <Button
                        size='small'
                        onClick={() => handleAccept(booking.id)}
                        name={`accept${idx}`}
                      >
                        Accept
                      </Button>
                      <Button
                        size='small'
                        onClick={() => handleDeny(booking.id)}
                        name={`deny${idx}`}
                      >
                        Deny
                      </Button>
                    </Grid>
                      )
                    : (
                    `${booking.status}`
                      )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
        <Pagination
          count={totalPage}
          color='primary'
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}
