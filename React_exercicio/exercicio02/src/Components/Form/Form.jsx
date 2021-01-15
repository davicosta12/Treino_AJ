import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
    const { desactiveBtnCreate, desactiveBtnUpdate } = props;

    useEffect(() => {
        setFormData(props.user)
    }, [])

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    return (
        <>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    disabled={props.desactiveBtnUpdate}
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
                    label="email"
                    type="email"
                    value={formData.email}
                />
            </div>
        </form>
        <div className="btnsModal">
            <Button
                onClick={() => props.onClose()}
                color="secondary"
                variant="contained" >Close
            </Button>
            {desactiveBtnCreate && <Button
                onClick={() => props.onCreateUser(formData)}
                color="secondary"
                variant="contained" >Create
            </Button>}
            {desactiveBtnUpdate && <Button
                onClick={() => props.onEditUser(formData)}
                color="secondary"
                variant="contained" >Update
            </Button>}
        </div>
        </>
    );
}

export default Form; 