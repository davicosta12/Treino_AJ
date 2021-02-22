import './Form.css'
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import Interruptor from '../../common/Interruptor/Interruptor';

const UsuariosForm = (props) => {
	const { createMode, setUser, user } = props

	const handleChange = (ev) => {
		setUser(ev.target.value);
	}

	return (
		<div className="form">
			<div>
				<TextField
					onChange={handleChange}
					disabled={!createMode}
					placeholder={'Digite o usuário'}
					id="name"
					name="name"
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
					user={user}
					setUser={setUser}
					isAdmin={true}
				/>
			</div>
			<h2>Status</h2>
			<div className="Interruptor">
				<Interruptor
					user={user}
					setUser={setUser}
					isStatus={true}
				/>
			</div>
		</div>
	);
}

export default UsuariosForm; 