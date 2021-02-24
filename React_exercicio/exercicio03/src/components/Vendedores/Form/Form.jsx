import './Form.css'
import React from 'react';
import TextField from '@material-ui/core/TextField';

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
					placeholder={'Digite o nome do vendedor'}
					id="name"
					name="nome"
					value={seller.nome}
					label="Vendedor"
					size="small"
					type='text'
					variant="standard"
					margin="normal"
					autoComplete="off"
					fullWidth
				/>
			</div>
		</div>
	);
}

export default VendedoresForm; 