import React from 'react';
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

export default function Login() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<div>
				<TextField
					id="standard-name-input"
					label="Nome"
					type="text"
					placeholder="Nome"
					variant="filled"
				/>
			</div>
			<div>
				<TextField
					id="filled-password-input"
					label="Password"
					type="password"
					placeholder="Password"
					autoComplete="current-password"
					variant="filled"
				/>
			</div>
		</form>
	);
}