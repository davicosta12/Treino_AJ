import './Form.css'
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '../Fab/Fab'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const INITIAL_STATE = {
    id: '',
    name: '',
    email: '',
    obs: '',
}

const Form = (props) => {
    const classes = useStyles();

    const [formData, setFormData] = useState(INITIAL_STATE);
    const { user, activeBtnCreate, activeBtnUpdate, onCloseModal, onEditUser, onCreateUser} = props;

    useEffect(() => {
        setFormData(user)
    }, [user])

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const CloseModal = () => {
        onCloseModal()
    }

    const EditUser = () => {
        onEditUser(formData)
    }

    const CreateUser = () => {
        onCreateUser(formData)
    }

    return (
        <>
        <form className={classes.root} noValidate autoComplete="off">
            <div className="form">
                {activeBtnCreate && <h2>Inserir usuário</h2>}
                {activeBtnUpdate && <h2>Editar usuário</h2>}
                <TextField
                    disabled={activeBtnUpdate}
                    onChange={handleChange}
                    name="id"
                    label="Código"
                    type="text"
                    value={formData.id}
                />
                <TextField
                    onChange={handleChange}
                    name="name"
                    label="Nome"
                    value={formData.name}
                />
                <TextField
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                />
                <TextField
                    onChange={handleChange}
                    name="obs"
                    label="Observações"
                    type="text"
                    value={formData.obs}
                />
            </div>
        </form>
        <div className="btnsModal">
            <Fab 
                onClickFunction={CloseModal}
                iconClose={true}
            />
            {activeBtnCreate && <Fab 
                onClickFunction={CreateUser}
                iconAddModal={true}
                    
            />}   
            {activeBtnUpdate && <Fab 
                onClickFunction={EditUser}
                iconEditModal={true}  
            />}
        </div>
        </>
    );
}

export default Form; 