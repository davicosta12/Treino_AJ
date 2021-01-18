import './Modal.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from '../Form/Form'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '../Table/Table';
import Fab from '../Fab/Fab'
import Loading from '../Loading/Loading'
import AlertWarn from '../../Utils/WarningAlert'
import Totalizador from '../Totalizador/totalizador';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const TransitionsModal = (props) => {
    const classes = useStyles();
    const { user, users, onGetUser, onCreateUser, onDeleteUser, onUpdateUser, setShowBtn,
        activeLoadingModal, activeBtnUpdate, activeBtnCreate, onClearForm, activeAlertInfo, alertMessageInfo } = props;
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
                    users={users}
                    user={user}
                    onGetUser={onGetUser}
                    onDeleteUser={onDeleteUser}
                    onUpdateUser={onUpdateUser}
                    setShowBtn={setShowBtn}
                    openModal={handleOpen}
                    activeLoadingModal={activeLoadingModal}
                />
            </div>
            { !activeLoadingModal && <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        { activeAlertInfo  && <AlertWarn 
                            alertMessage={alertMessageInfo}
                        />}
                        <Form
                            user={user}
                            activeBtnUpdate={activeBtnUpdate}
                            activeBtnCreate={activeBtnCreate}
                            onCloseModal={handleClose}
                            onCreateUser={handleCreateUser}
                            onEditUser={handleEditUser}
                        />

                    </div>
                </Fade>
            </Modal>}
            <div className="btnAdd">
            <Totalizador users={users}></Totalizador> 
                <Fab 
                    onClickFunction={hadleBtnAddUser}
                    iconAdd={true}
                />
            </div>
            <Loading activeLoadingModal={activeLoadingModal} />
        </div >
    );
}

export default TransitionsModal;

