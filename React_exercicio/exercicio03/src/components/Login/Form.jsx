import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '../common/Snackbar/Snackbar'
import Button from '../common/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const LoginForm = (props) => {
	const [activeShowbar, setActiveShowbar] = useState(false);
	const [showbarMessage, setMessage] = useState('');
	const [severityShowbar, setSeverity] = useState('');

	useEffect(() => {
		new AuthService(localStorage.getItem('token'));
	}, []);

	const setShowbar = () => {
		setActiveShowbar(false);
		setMessage('');
		setSeverity('');
	}

	const errorHandler = (err, severity, message = null) => {
		console.error(err);
		const defaultMessage = 'Ocorreu um erro ao processar as informações';
		setActiveShowbar(true);
		setMessage(`${message || defaultMessage}`);
		setSeverity(`${severity}`);
	}

	const handleGetToken = async () => {
		const payload = {
			"branchId": 1,
			"usuario": "david",
			"senha": "123abc"
		}
		try {
			const token = await new AuthService().getToken(payload);
			localStorage.setItem('token', token)
			props.history.push('/')
			console.log(token);
		}
		catch (error) {
			if (error.status === 401)
				errorHandler(error, 'error', 'As credenciais informadas estão incorretas')
			else if (error.response?.data?.message)
				errorHandler(error, 'error', error.response.data.message)
			else
				errorHandler(error, 'error')
			console.log(error);
		}
		finally {
			console.log("finally")
		}
	}

	const classes = useStyles();
	return (
		<div>
			<Snackbar
				activeShowbar={activeShowbar}
				showbarMessage={showbarMessage}
				severity={severityShowbar}
				setShowbar={setShowbar}
			/>
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
					onGetToken={handleGetToken}
					variant="contained"
					label="Entrar"
				/>
				
			</form>
		</div>

	);
}

export default withRouter(LoginForm)
