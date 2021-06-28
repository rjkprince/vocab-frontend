import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export  function NewWordDialog({open,handleClose,handleSubmit,inputVal,setInputVal}) {
  return (

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add To Dictionary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new word please type the word and hit submit.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Word"
            type="text"
            value={inputVal}
            onChange={e=>setInputVal(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={()=>handleSubmit(inputVal)} >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

  );
}