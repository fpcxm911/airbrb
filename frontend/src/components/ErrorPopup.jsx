import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ErrorDialog (props) {
  console.log(props);

  return (
    <React.Fragment>
      <Dialog
        maxWidth = {'xs'}
        open
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.content.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.content.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
