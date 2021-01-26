import './Modal.css'
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Form from '../../Usuarios/Form/Form'
import Table from '../../common/Table/Table';
import Fab from '../../common/Fab/Fab'
import Loading from '../../common/Loading/Loading'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {
  const { user, users, onGetUser, onCreateUser, onDeleteUser, onUpdateUser, setShowBtn,
    activeLoadingModal, activeBtnUpdate, activeBtnCreate, onClearForm, } = props;
  const [open, setOpen] = useState(false);

  const clearFormData = () => {
    onClearForm();
  }

  const handleCreateUser = formData => {
    onCreateUser(formData, handleClose)
  }

  const handleEditUser = formData => {
    onUpdateUser(formData, handleClose)
  }

  const hadleBtnAddUser = () => {
    setShowBtn('activeBtnUpdate', false)
    setShowBtn('activeBtnCreate', true)
    // console.log(formData)
    clearFormData()
    handleOpen()
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Table
          TableBodyItens={[...users]}
          TableheadItens={['Código', 'Nome', 'Email']}
          onGetUser={onGetUser}
          onDeleteUser={onDeleteUser}
          onUpdateUser={onUpdateUser}
          setShowBtn={setShowBtn}
          openModal={handleOpen}
          activeLoadingModal={activeLoadingModal}
        />
      </div>
      { !activeLoadingModal && <Dialog
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        open={open}
        onClose={handleClose}
      >
        <Form
          user={user}
          activeBtnUpdate={activeBtnUpdate}
          activeBtnCreate={activeBtnCreate}
          onCloseModal={handleClose}
          onCreateUser={handleCreateUser}
          onEditUser={handleEditUser}
        />
      </Dialog>}
      <div className="btnAdd">
        <Fab
          title="Adicionar"
          variant="round"
          size="small"
          label="add"
          onClickFunction={hadleBtnAddUser}
          color="primary"
          iconAdd={true}
        />
      </div>
      <Loading activeLoadingModal={activeLoadingModal} />
    </div >
  );
}

export default Modal;

