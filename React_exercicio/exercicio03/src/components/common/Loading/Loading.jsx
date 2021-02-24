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
  const { activeLoading } = props;
  return (
    <div className={classes.root} >
      { activeLoading && <CircularProgress className={classes.stylesLoading} size={80} />}
    </div>
  );
}

export default CircularIndeterminate