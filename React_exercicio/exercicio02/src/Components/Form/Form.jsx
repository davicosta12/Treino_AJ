import React, { useState, useEffect } from 'react';
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


const Form = (props) => {
    const classes = useStyles();
    const { formData } = props;

    const handleChange = ({ target: { name, value } }) => {
        props.setFormData({ ...props.formData, [name]: value })

    }
    return (
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
    );
}

export default Form; 