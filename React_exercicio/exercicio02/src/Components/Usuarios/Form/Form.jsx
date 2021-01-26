import './Form.css'
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '../../common/Fab/Fab'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const INITIAL_STATE = {
	id: '',
	name: '',
	email: '',
	obs: '',
}

const Form = (props) => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const { user, activeBtnCreate, activeBtnUpdate, onCloseModal, onEditUser, onCreateUser } = props;
	const { id, name, email, obs } = formData;
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
			<div className="title">
				{activeBtnCreate && <DialogTitle id="alert-dialog-title">{"Criar usuário"}</DialogTitle>}
				{activeBtnUpdate && <DialogTitle id="alert-dialog-title">{"Editar usuário"}</DialogTitle>}
			</div>

			<DialogContent>
				<div className="form">
					<div className="form-div-codigo">
						<TextField
							disabled={activeBtnUpdate}
							onChange={handleChange}
							placeholder="Digite o código"
							id="id"
							name="id"
							label="Código"
							size="small"
							type="number"
							variant="standard"
							margin="normal"
							value={id}
						/>
					</div>
					<div>
						<TextField
							onChange={handleChange}
							placeholder="Digite o nome do usuário"
							id="name"
							name="name"
							label="Nome"
							size="small"
							type="text"
							value={name}
							variant="standard"
							margin="normal"
							fullWidth

						/>
					</div>
					<div>
						<TextField
							onChange={handleChange}
							placeholder="Digite o e-mail do usuário"
							id="email"
							name="email"
							label="Endereço de e-mail"
							size="small"
							type="email"
							value={email}
							variant="standard"
							margin="normal"
							fullWidth
						/>
					</div>
					<div className="textArea">
						<TextField
							onChange={handleChange}
							placeholder="Escreva uma observação"
							id="obs"
							name="obs"
							label="Observações"
							size="small"
							type="text"
							value={obs}
							variant="outlined"
							fullWidth
							multiline={true}
							margin="normal"
							rows={4}
						/>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<div className="btnsModal">
					<Fab
						onClickFunction={CloseModal}
						variant="extended"
						title="Fechar"
						size="small"
						textComponent="Fechar"
						color="secondary"
						iconClose={true}
					/>
					{(activeBtnCreate || activeBtnUpdate) && <Fab
						onClickFunction={activeBtnCreate ? CreateUser : EditUser}
						variant="extended"
						title="Confirmar"
						size="small"
						label="edit"
						textComponent="Confirmar"
						color="primary"
						iconCheck={true}
					/>}
				</div>
			</DialogActions>
		</>
	);
}

export default Form; 