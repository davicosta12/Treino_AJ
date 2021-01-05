import './Form.css';
import React from 'react';

const Form = props => {
    return (
        <div className="Form">
            <form>
                <div className="row">
                    <div  className="col s12 m4 l2 "><label>Código<input type="text" name="codigo" id="input_age" placeholder="Código" autoFocus /></label></div>
                    <div className="col s12 m4 l5 "><label>Nome<input type="text" name="nome" id="input_name" placeholder="Digite seu nome" /></label></div>
                    <div className="col s12 m4 l5"><label>Email<input type="email" name="email" id="input_email" placeholder="Digite seu e-mail" /></label></div>
                </div>
            </form>
            <button 
                type="button" 
                id="btn_add"
                className="btn btn-secondary">
            Adicionar</button>
        </div>
    )
}
    
export default Form