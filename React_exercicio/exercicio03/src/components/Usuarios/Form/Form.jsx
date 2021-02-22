import './Form.css'
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import Interruptor from '../../common/Interruptor/Interruptor';

const UsuariosForm = (props) => {
	const { createMode, user, onChange } = props

	const handleChange = (ev) => {
		onChange(ev);
	}

	return (
		<div className="form">
			<div>
				<TextField
					onChange={handleChange}
					disabled={!createMode}
					placeholder={'Digite o usuário'}
					id="usuario"
					name="usuario"
					label="Usuário"
					size="small"
					type='text'
					value={user.usuario}
					variant="standard"
					margin="normal"
					autoComplete="off"
					fullWidth
				/>
			</div>
			<h2>Admin</h2>
			<div className="Interruptor">
				<Interruptor
					name="isAdmin"
					value={user.isAdmin}
					onChange={handleChange}
					
				/>
			</div>
			<h2>Status</h2>
			<div className="Interruptor">
				<Interruptor
					name="status"
					value={user.status}
					onChange ={handleChange}
				/>
			</div>
		</div>
	);
}

export default UsuariosForm; 