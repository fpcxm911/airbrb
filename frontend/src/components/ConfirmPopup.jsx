import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmPopup (props) {
  return (
    <React.Fragment>
      <Dialog
        maxWidth = {'xs'}
        open
        onClose={props.close}
      >
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
          <DialogContentText>
            Are you sure this is correct?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color="success" name='confirm' onClick={props.confirm}>Confirm</Button>
          <Button variant='contained' color="error" name='cancel' onClick={props.cancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
