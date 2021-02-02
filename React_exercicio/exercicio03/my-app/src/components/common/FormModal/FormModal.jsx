import '../Interruptor/Interruptor.css'
import './Form.css'
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '../Fab/Fab'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Interruptor from '../Interruptor/Interruptor'

const Form = (props) => {
	const { createMode, onCloseModal, placeholder, label, type, title } = props

	const handleCloseModal = () => {
		onCloseModal()
	}

	return (
		<>
			<div className="title">
				<DialogTitle id="alert-dialog-title">
					{title}
				</DialogTitle>
			</div>

			<DialogContent>
				<div className="form">
					<div className="form-div-codigo">
						<TextField
							disabled={createMode}
							placeholder={placeholder[0]}
							id="id"
							name="id"
							label={label[0]}
							size="small"
							type={type[0]}
							variant="standard"
							margin="normal"
						/>
					</div>
					<div>
						<TextField
							placeholder={placeholder[1]}
							id="name"
							name="name"
							label={label[1]}
							size="small"
							type={type[1]}
							variant="standard"
							margin="normal"
							fullWidth
						/>
					</div>
				<div className="Interruptor">
					<Interruptor />
				</div>

				</div>
			</DialogContent>
			<DialogActions>
				<div className="btnsModal">
					<Fab
						onClick={handleCloseModal}
						variant="extended"
						title="Fechar"
						size="small"
						textComponent="Fechar"
						color="secondary"
						iconClose={true}
					/>
					<Fab
						variant="extended"
						title="Confirmar"
						size="small"
						label="edit"
						textComponent="Confirmar"
						color="primary"
						iconCheck={true}
					/>
				</div>
			</DialogActions>
		</>
	);
}

export default Form; 