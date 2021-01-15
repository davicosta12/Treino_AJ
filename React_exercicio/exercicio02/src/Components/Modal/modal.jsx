import './Modal.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from '../Form/Form'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Table from '../Table/Table';
import Loading from '../Loading/Loading'


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
    const { user, users, onGetUser, onDeleteUser, onUpdateUser, setShowBtn,
        activeLoadingModal, desactiveBtnUpdate, desactiveBtnCreate } = props;
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (!user?.id && formData.id) {
    //         setFormData(INITIAL_STATE)
    //     }
    //     if (user?.id && user.id !== formData.id) {
    //         setFormData({ ...user })
    //     }

    // }, [user.id])

    const clearFormData = () => {
        props.onClearForm();
    }

    const handleCreateUser = formData => {
        props.onCreateUser(formData, handleClose)
    }

    const handleEditUser = formData => {
        props.onUpdateUser(formData, handleClose)
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
                        <Form
                            user={user}
                            desactiveBtnUpdate={desactiveBtnUpdate}
                            desactiveBtnCreate={desactiveBtnCreate}
                            onClose={handleClose}
                            onCreateUser={handleCreateUser}
                            onEditUser={handleEditUser}
                        />

                    </div>
                </Fade>
            </Modal>}

            <Button
                onClick={() => {
                    setShowBtn('desactiveBtnUpdate', false)
                    setShowBtn('desactiveBtnCreate', true)
                    clearFormData()
                    // console.log(formData)
                    handleOpen()
                }}
                color="secondary"
                variant="contained"
                size="small"
            >
                Adicionar
        </Button>
            <Loading activeLoadingModal={activeLoadingModal} />
        </div>
    );
}

export default TransitionsModal;

