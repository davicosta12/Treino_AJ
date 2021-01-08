import './Form.css';
import React, { useState } from 'react';

const Form = props => {
  return (
    <div className="Form">
      <form>
        <div className="row">
          <div className="col s12 m4 l2 ">
            <label>Código
              <input
                onChange={ev => handleChange(ev, props)}
                type="text"
                name="codigo"
                placeholder="Código"
                autoFocus />
            </label>
          </div>
          <div className="col s12 m4 l5 ">
            <label>Nome
              <input
                onChange={ev => handleChange(ev, props)}
                type="text"
                name="nome"
                placeholder="Digite seu nome" />
            </label>
          </div>
          <div className="col s12 m4 l5">
            <label>Email
              <input
                onChange={ev => handleChange(ev, props)}
                type="email"
                name="email"
                placeholder="Digite seu e-mail" />
            </label>
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          props.activeLoading()
          props.onEnviarDados(props)
        }}
        type="button"
        className="btn btn-secondary">
        Adicionar</button>
    </div>
  )
}
const handleChange = ({ target: { name, value }}, props) => props.onChangeData({ name, value });

export default Form