import './Modal.css'
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Form from '../Form/Form'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {

  const {
    open, user, createMode,
    onClose, onCreateUser, onUpdateUser
  } = props;

  const handleCreateUser = formData => {
    onClose();
    onCreateUser(formData);
  }

  const handleEditUser = formData => {
    onClose();
    onUpdateUser(formData);
  }

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
      <Form
        user={user}
        createMode={createMode}
        onCloseModal={onClose}
        onConfirmCreate={handleCreateUser}
        onConfirmEdit={handleEditUser}
      />
    </Dialog>
  );
}

export default Modal;

