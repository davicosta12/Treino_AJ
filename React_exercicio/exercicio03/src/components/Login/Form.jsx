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

const INITIAL_STATE = {
	loginForm: {usuario: '', pass: ''},
	activeShowbar: false,
	showbarMessage: '',
	severityShowbar: '',
}

let authService = null;

const LoginForm = (props) => {
	const [state, setState] = useState(INITIAL_STATE);
	const { activeShowbar, showbarMessage, severityShowbar, loginForm} = state;

	useEffect(() => {
		authService = new AuthService(localStorage.getItem('token'));
	}, []);

	const handleChange = ({ target: { name, value} }) => {
		setState({ ...state, loginForm: { ...loginForm, [name]: value } })
		console.log(state)
	}

	const setShowbar = () => {
		setState({
			setActiveShowbar: false,
			setShowbarMessage: '',
			setSeverityShowbar: ''
		})
	}

	const errorHandler = (err, severity, message = null) => {
		console.error(err);
		const defaultMessage = 'Ocorreu um erro ao processar as informações';
		setState({
			setActiveShowbar: true,
			setShowbarMessage: `${message || defaultMessage}`,
			setSeverityShowbar: `${severity}`
		})
	}

	const handleGetToken = async () => {
		const {usuario, pass} = loginForm;
		console.log(typeof(usuario))
		console.log(pass)
		const payload = {
			"branchId": 1,
			"usuario": usuario,
			"senha": pass  
		}
		try {
			const token = await authService.getToken(payload);
			localStorage.setItem('token', token)
			props.history.push('/')
			console.log(token);
		}
		catch (error) {
			console.log(error.response)
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
				severityShowbar={severityShowbar}
				setShowbar={setShowbar}
			/>
			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						onChange={handleChange}
						name="usuario"
						id="standard-name-input"
						label="Usuário"
						type="text"
						variant="filled"
						value={loginForm.usuario}
					/>
				</div>
				<div>
					<TextField
						onChange={handleChange}
						name="pass"
						id="filled-password-input"
						label="Senha"
						type="password"
						autoComplete="current-password"
						variant="filled"
						value={loginForm.pass}
					/>
				</div>
				<Button
					onClick={handleGetToken}
					variant="contained"
					label="Entrar"
				/>

			</form>
		</div>

	);
}

export default withRouter(LoginForm)
