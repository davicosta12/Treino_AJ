import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function CustomButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        onClick={() => { props.onClick() }}
        variant={props.variant}
        color="primary"
      >
        {props.label}
      </Button>
    </div>
  );
}