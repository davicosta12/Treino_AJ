import './Form.css'
import React from 'react';
import TextField from '@material-ui/core/TextField';

import Interruptor from '../../common/Interruptor/Interruptor';

const VendedoresForm = (props) => {
	const { createMode, onChange } = props

	const handleChange = () => {

		onChange();
	}

	return (
		<div className="form">
			<div className="form-div-codigo">
				<TextField
					disabled={!createMode}
					placeholder={'Digite o código'}
					id="id"
					name="id"
					label="Código"
					size="small"
					type="text"
					variant="standard"
					margin="normal"
				/>
			</div>
			<div>
				<TextField
					placeholder={'Digite o usuário'}
					id="name"
					name="name"
					label="Usuário"
					size="small"
					type='text'
					variant="standard"
					margin="normal"
					autoComplete="off"
					fullWidth
				/>
			</div>
			<div className="Interruptor">
				<Interruptor />
			</div>
		</div>
	);
}

export default VendedoresForm; 