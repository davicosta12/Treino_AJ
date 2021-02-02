import './Modal.css'
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FormModal from '../FormModal/FormModal'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {

  const {
    open, onClose, createMode, placeholder, 
    label, type, title
  } = props;

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      open={open}
      onClose={onClose}
    >
      <FormModal
        title={title}
        placeholder={placeholder}
        type={type}
        label={label}
        createMode={createMode}
        onCloseModal={onClose}
      />
    </Dialog>
  );
}

export default Modal;

