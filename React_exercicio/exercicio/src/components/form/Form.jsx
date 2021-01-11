import './Form.css';
import React, {useState} from 'react';
import Validacoes from '../../validacoes'

const Form = props => {
  const [enabled, setEnabled] = useState(false);
  const $value_inputs = document.getElementsByClassName('input');

  return (
    <div className="Form">
      <form>
        <div className="row">
          <div className="col s12 m4 l2 ">
            <label>Código
              <input
                onChange={ev => handleChange(ev, props)}
                type="text"
                name="id"
                className="input"
                placeholder="Código"
                autoFocus />
            </label>
          </div>
          <div className="col s12 m4 l5 ">
            <label>Nome
              <input
                onChange={ev => handleChange(ev, props)}
                type="text"
                name="name"
                className="input"
                placeholder="Digite seu nome" />
            </label>
          </div>
          <div className="col s12 m4 l5 ">
            <label>Email
              <input
                onChange={ev => handleChange(ev, props)}
                type="email"
                name="email"
                className="input"
                placeholder="Digite seu e-mail " />
            </label>
          </div>
        </div>
      </form>
      <button
        onClick={() => {handleCreateUser($value_inputs, setEnabled, props)}}
        disabled={enabled ? true : false}
        type="button"
        className="btn btn-secondary">
        Adicionar</button>
    </div>
  )
}
const handleChange = ({ target: { name, value }}, props) => props.onChangeData({ name, value });

const handleCreateUser = ($value_inputs, setEnabled, props) => {
  if(Validacoes($value_inputs)) return;
  setEnabled(true);
  props.onEnviarDados(setEnabled, $value_inputs) 
}

export default Form