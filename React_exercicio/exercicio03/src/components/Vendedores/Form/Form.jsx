import './Form.css'
import React from 'react';
import TextField from '@material-ui/core/TextField';

import Interruptor from '../../common/Interruptor/Interruptor';

const VendedoresForm = (props) => {
	const { seller, createMode, onChange } = props

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
					id="name"
					name="nome"
					value={seller.nome}
					label="Usuário"
					size="small"
					type='text'
					variant="standard"
					margin="normal"
					autoComplete="off"
					fullWidth
				/>
			</div>
			<h2>Status</h2>
			<div className="Interruptor">
				<Interruptor name={'inativo'} value={seller.inativo} onChange={handleChange} />
			</div>
		</div>
	);
}

export default VendedoresForm; 