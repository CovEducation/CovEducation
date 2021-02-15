import React, { cloneElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const ModalTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          id="modalCloseButtons"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const ModalContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function Modal(props) {
  // Called as so <Modal text="test" title="ahh" trigger={<Button> Test </Button>}> stuff to show up in modal </Modal>
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      { props.trigger && cloneElement(props.trigger,{ onClick: handleClickOpen }) }
      <Dialog aria-labelledby="customized-dialog-title" open={props.open || open}>
        <ModalTitle id="customized-dialog-title" onClose={props.handleClose || handleClose}>
          {props.title}
        </ModalTitle>
        <ModalContent dividers>
          {props.children}
        </ModalContent>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: 'title',
  trigger: <button> Use Button Component as trigger! </button>
};