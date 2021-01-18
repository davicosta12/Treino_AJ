import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertSucess = (props) => {
  const classes = useStyles();
  const message = props.alertMessage
  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity="success">
        {message} — <strong>operação concluída!</strong>!
      </Alert>
    </div>
  );
}

export default AlertSucess;