import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../common/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export default function LoginForm() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div>
				<TextField
					id="standard-name-input"
					label="Usuário"
					type="text"
					variant="filled"
				/>
			</div>
			<div>
				<TextField
					id="filled-password-input"
					label="Senha"
					type="password"
					autoComplete="current-password"
					variant="filled"
				/>
			</div>
			<Button
				variant="contained"
				label="Entrar"
			/>
		</form>
	);
}
