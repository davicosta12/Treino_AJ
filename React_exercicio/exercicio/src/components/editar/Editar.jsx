import React, { Component } from 'react';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../../API/http'
import Loading from '../loadingBarrer/Loading'
import Validacoes from '../../validacoes'

const values_modalForm = document.getElementsByClassName('input_modal');
const textAreaValue = document.getElementsByTagName('textarea');

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  obs: '',
}

class Editar extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidUpdate() {
    if (!this.props.usuario?.id && this.state.id) {
      this.setState(INITIAL_STATE);
    }

    if (this.props.usuario?.id && 
      this.props.usuario.id !== this.state.id
    ) {
        this.setState({ ...this.props.usuario });
    }
  }

  handleChange = ev =>
    this.setState({ [ev.target.name]: ev.target.value });

  handleUpdate = (ev) => {
    ev.preventDefault();
    if(Validacoes(values_modalForm, textAreaValue)) return;
    this.props.onUpdate(this.state)
  }

  render() {
    const { id, name, email, obs } = this.state;
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <Loading isActiveLoading={this.props.isActiveLoading} />
          <h4>Editar Formulário</h4>
          <label>Código
            <input
              readOnly
              type="text"
              name="id"
              className="label-input-modal label-input-cod-modal form-control input_modal"
              placeholder="Novo código"
              value={id}
            />
          </label>
          <label>Nome
            <input
              onChange={this.handleChange}
              value={name}
              name="name"
              type="text"
              className="form-control input_modal"
              placeholder="Digite outro nome"
              autoFocus />
          </label>
          <label>Email
            <input
              onChange={this.handleChange}
              value={email}
              type="email"
              name="email"
              className="label-input-modal form-control input_modal"
              placeholder="Digite um e-mail diferente" />
          </label>
          <label htmlFor="textarea1">Textarea</label>
          <textarea
            onChange={this.handleChange}
            name="obs"
            value={obs}
            className="materialize-textarea"
            placeholder="Observações"
            maxLength="80">
          </textarea>
        </div>

        <div className="modal-footer">
          <a
            href="#!"
            onClick={ev => ev.preventDefault()}
            className="modal-close waves-effect waves-green btn-flat"
          >
            Cancelar
          </a>
          <a
            onClick={ev => {this.handleUpdate(ev)}}
            href="#!"
            className="waves-effect waves-green btn-flat"
          >
            OK
          </a>
        </div>
      </div>
    )
  }

}

export default Editar;