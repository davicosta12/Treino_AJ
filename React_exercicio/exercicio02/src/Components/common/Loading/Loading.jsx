import './Loading.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 600,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate = (props) => {
  const classes = useStyles();
  const { activeLoadingModal } = props;
  return (
    <div className={classes.root} >
      { activeLoadingModal && <CircularProgress className={classes.stylesLoading} />}
    </div>
  );
}

export default CircularIndeterminate