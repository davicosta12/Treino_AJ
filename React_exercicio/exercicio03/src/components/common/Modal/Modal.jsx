import './Modal.css'
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading'

import Fab from '../../common/Fab';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {

  const {
    open, onClose, onConfirm, title, confirmBtnTitle, confirmBtnLabel,
  } = props;

  const hadleConfirm = () => {
    onConfirm();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      fullWidth={true}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-title" className="title">
        {title}
      </DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        <div className="btnsModal">
          <Fab
            onClick={onClose}
            variant="extended"
            title="Fechar"
            size="small"
            textComponent="Fechar"
            color="secondary"
            iconClose={true}
          />
          <Fab
            onClick={hadleConfirm}
            variant="extended"
            title={confirmBtnTitle}
            size="small"
            label={confirmBtnLabel}
            textComponent={confirmBtnTitle}
            color="primary"
            iconCheck={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;

