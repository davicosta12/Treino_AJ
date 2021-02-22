import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);
  const { activeShowbar, severityShowbar, showbarMessage, onReset } = props;
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    onReset()
    setOpen(false);
  };

  useEffect(() => {
    if (activeShowbar === true) handleClick()
  }, [activeShowbar])


  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severityShowbar}>
          {showbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}