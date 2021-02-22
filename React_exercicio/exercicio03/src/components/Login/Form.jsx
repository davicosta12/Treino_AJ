import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import AuthService from '../../Services/AuthService';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '../common/Snackbar/Snackbar'
import Button from '../common/Button';
import checkValidation from '../../util/validacoes'

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const INITIAL_STATE = {
	loginForm: { usuario: '', pass: '' },
	activeShowbar: false,
	showbarMessage: '',
	severityShowbar: '',
}

let authService = null;

const LoginForm = (props) => {
	const [state, setState] = useState(INITIAL_STATE);
	const { activeShowbar, showbarMessage, severityShowbar, loginForm } = state;

	useEffect(() => {
		authService = new AuthService(localStorage.getItem('token'));
	}, []);

	const handleChange = ({ target: { name, value } }) => {
		setState({ ...state, loginForm: { ...loginForm, [name]: value } })
		console.log(state)
	}

	const handleResetSnackbar = () => {
		setState({
			activeShowbar: false,
			showbarMessage: '',
			severityShowbar: ''
		})
	}

	const errorHandler = (err, severity, message = null) => {
		console.error(err);
		const defaultMessage = 'Ocorreu um erro ao processar as informações';
		setState({
			activeShowbar: true,
			showbarMessage: `${message || defaultMessage}`,
			severityShowbar: `${severity}`
		})
	}

	const isNotvalidUser = user => {
		console.log(user)
    const { notValid, message } = checkValidation([...user])
    if (notValid) {
      setState({
        activeShowbar: true,
        showbarMessage: message,
        severityShowbar: 'warning',
      })
      return true;
    }
    return false;
  }

	const handleGetToken = async () => {
		try {
			const { usuario, pass } = loginForm;
			const payload = {
				"branchId": 1,
				"usuario": usuario,
				"senha": pass
			}
			const token = await authService.getToken(payload);
			localStorage.setItem('token', token)
			props.history.push('/')
			console.log(token);
		}
		catch (error) {
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
				onReset={handleResetSnackbar}
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
