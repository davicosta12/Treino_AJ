import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const FloatingActionButtonSize = (props) => {
  const classes = useStyles()
  const { onClickFunction, disabled, iconAdd, iconDelet, iconEdit, iconClose, iconCheck,
    title, color, label, size, variant, textComponent} = props;

  return (
    <div>
      <Tooltip title={title} >
        <Fab
          onClick={onClickFunction}
          color={color}
          variant={variant}
          size={size}
          disabled={disabled ? disabled : false}
          aria-label={label ? label : ""}
          className={classes.margin}>
          {iconAdd && <AddIcon />}
          {iconEdit && <CreateIcon />}
          {iconDelet && <DeleteForeverIcon />}
          {iconClose && <CloseIcon />}
          {iconClose ? textComponent: ''}
          {iconCheck && <CheckIcon />}
          {iconCheck ? textComponent: ''}
        </Fab>
      </Tooltip>
    </div>
  );
}

export default FloatingActionButtonSize;