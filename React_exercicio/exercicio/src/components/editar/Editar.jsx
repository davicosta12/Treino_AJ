import React, { Component } from 'react';
import Loading from '../loadingBarrer/Loading'
import { isNotValid, isNotValidTextArea } from '../../utils/validacoes'

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
    if (!this.props.user?.id && this.state.id) {
      this.setState(INITIAL_STATE);
    }

    if (this.props.user?.id &&
      this.props.user.id !== this.state.id
    ) {
      this.setState({ ...this.props.user });
    }
  }

  handleChange = ({target: { name, value }}) => this.setState({ [name]: value });

  handleUpdateUser = (ev, id, name, email, obs) => {
    ev.preventDefault();
    if (isNotValid([id, name, email])) return;
    if (isNotValidTextArea(obs)) return;
    this.props.onUpdateUser(this.state);
  }

  render() {
    const { id, name, email, obs } = this.state;
    const { isActiveLoadingModal } = this.props;

    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <Loading isActiveLoadingModal={isActiveLoadingModal} />
          <h4>Editar Formulário</h4>
          <label>Código
            <input
              readOnly
              type="text"
              name="id"
              className="label-input-modal label-input-cod-modal form-control"
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
              className="label-input-modal form-control"
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
            onClick={ev => { this.handleUpdateUser(ev, id, name, email, obs) }}
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