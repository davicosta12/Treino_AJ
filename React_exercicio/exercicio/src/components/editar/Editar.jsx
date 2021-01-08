import React, { Component } from 'react';
import {getAllUsers, createUser, getUser, updateUser, deleteUser } from '../../API/http'
import Loading from '../loadingBarrer/Loading'

class Editar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        id: '',
        name: '',
        email: '',
        obs: '',
        }
    }

    setStateDefault() {
      this.setState({
        id: '',
        name: '',
        email: '',
        obs: '',
      })
    }

    activeLoadingModal() {
      this.props.activeLoadingModal()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.usuario?.id !== this.props.usuario.id) {
          getUser(this.props.usuario.id)
          .then(user => this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            obs: user.obs,
          }))
          .catch(() => {
            this.props.desactiveLoadingModal()
          })
          .finally(()=> {
              this.props.desactiveLoadingModal()
          })   
         }
      }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <Loading isActive={this.props.isActive} />
          <h4>Editar Formulário</h4>
          <label>Código
            <input
              readOnly
              type="text"
              name="codigo-modal"
              className="label-input-modal label-input-cod-modal form-control"
              placeholder="Novo código"
              value={this.state.id}
            />
          </label>
          <label>Nome
            <input
              onChange={(event) => {
                let name = event.target.value;
                this.setState({ name });
              }}
              value={this.state.name}
              type="text"
              name="nome-modal"
              className="form-control"
              placeholder="Digite outro nome"
              autoFocus />
          </label>
          <label>Email
            <input
              onChange={(event) => {
                let email = event.target.value;
                this.setState({ email });
              }}
              value={this.state.email}
              type="email"
              name="email-modal"
              className="label-input-modal form-control"
              placeholder="Digite um e-mail diferente" />
          </label>
          <label htmlFor="textarea1">Textarea</label>
            <textarea 
            onChange={(event) => {
                let obs = event.target.value;
                this.setState({ obs });
              }}
            value={this.state.obs}
            className="materialize-textarea" 
            placeholder="Observações" 
            maxLength="80">
            </textarea>
        </div>

        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
          <a
            onClick={() => {
              this.props.onAtualizaDado(this.state, this.setStateDefault)
            }}
            href="#!"
            className="waves-effect waves-green btn-flat">OK
          </a>
        </div>
      </div>
    )
  }

}

export default Editar;