import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Pagination from '@mui/material/Pagination';
import { parseISO, format } from 'date-fns';
import { Button, Grid } from '@mui/material';
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
      props.setErrorMessage({ title: 'Error', body: res.error });
      props.setShowModal(true);
    } else {
      props.setBookingUpdate();
    }
  }
  const handleDeny = async (bookingId) => {
    const res = await apiCallBodyAuthen(`bookings/decline/${bookingId}`, localStorage.getItem('token'), {}, 'PUT');
    if (res.error) {
      props.setErrorMessage({ title: 'Error', body: res.error });
      props.setShowModal(true);
    } else {
      props.setBookingUpdate();
    }
  }
  React.useEffect(() => {
    if (props.data.length !== 0) {
      const start = (pageNum - 1) * 5
      const end = pageNum * 5
      const currentPage = props.data.slice(start, end);
      setRenderLst(currentPage)
    }
  }, [pageNum, props.data]);
  return (
    <React.Fragment>
      <Title>{props.current ? 'Booking Request' : 'Booking History'}</Title>
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
        <TableBody>
          {renderList.map((booking, idx) => (
            <TableRow key={idx}>
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
      <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
        <Pagination count={totalPage} color="primary" onChange={handlePageChange}/>
      </Grid>
    </React.Fragment>
  );
}
