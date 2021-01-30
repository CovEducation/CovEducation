import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

export default function Toast(props) {
    const [open, setOpen] = React.useState(props.open);
    
    //   const handleClose = (event, reason) => {
    //     if (reason === 'timeout') {
    //       data = !data;
    //     }
    //   };    

    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
     
    return (
        <Snackbar 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    //   onClose={() => {
    //       console.log('data',data)
    //     return data = false;
    //   }}
      open={props.open} autoHideDuration={1000} >
        <Alert severity={props.status || "success"}>
          {props.message || "This is a success message!"}
        </Alert>
      </Snackbar>

    );
}
