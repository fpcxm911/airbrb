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
  const [renderList, setRenderLst] = React.useState([])
  const [pageNum, setPageNum] = React.useState(1)
  const totalPage = Math.ceil(props.data.length / 5)
  const handlePageChange = (event, newPageNumber) => {
    setPageNum(newPageNumber);
  };

  const handleAccept = async (bookingId) => {
    const res = await apiCallBodyAuthen(`bookings/accept/${bookingId}`, localStorage.getItem('token'), {}, 'PUT');
    if (res.error) {
      props.toastError(res.error);
    } else {
      props.setBookingUpdate();
    }
  }
  const handleDeny = async (bookingId) => {
    const res = await apiCallBodyAuthen(`bookings/decline/${bookingId}`, localStorage.getItem('token'), {}, 'PUT');
    if (res.error) {
      props.toastError(res.error);
    } else {
      props.setBookingUpdate();
    }
  }
  React.useEffect(() => {
    const start = (pageNum - 1) * 5
    const end = pageNum * 5
    const currentPage = props.data.slice(start, end);
    setRenderLst(currentPage);
  }, [pageNum, props.data]);
  return (
    <Grid width={'100%'}>
      <Title>{props.current ? 'Booking Request' : 'Booking History'}</Title>

      <TableContainer>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Owner Email</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>{props.current ? 'Handle Request' : 'Booking Status'}</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody className='renderListContainer'>
          {renderList.map((booking, idx) => (
            <TableRow key={idx} className='bookingRow'>
              <TableCell>{booking.owner}</TableCell>
              <TableCell>{format(parseISO(booking.dateRange.start), 'do MMMM yyyy')}</TableCell>
              <TableCell>{format(parseISO(booking.dateRange.end), 'do MMMM yyyy')}</TableCell>
              <TableCell>{`$${booking.totalPrice}`}</TableCell>
              <TableCell>{props.current
                ? <Grid container>
                  <Button size='small' onClick={() => handleAccept(booking.id)}>Accept</Button>
                  <Button size='small' onClick={() => handleDeny(booking.id)}>Deny</Button>
                </Grid>
                : `${booking.status}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
        <Pagination count={totalPage} color="primary" onChange={handlePageChange}/>
      </Grid>
    </Grid>
  );
}
