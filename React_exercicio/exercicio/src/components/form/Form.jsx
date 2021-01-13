import './Form.css';
import React, { Component } from 'react';
import { isNotValid } from '../../utils/validacoes'

const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
}

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disableAdicionar !== this.props.disableAdicionar && !this.props.disableAdicionar) {
      this.setState(INITIAL_STATE)
    }
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  handleCreateUser = () => {
    const { id, name, email } = this.state;
    if (isNotValid([ id, name, email ])) return;
    this.props.onCreateUser(this.state);
  }

  render() {
    const { id, name, email } = this.state;
    const { disableAdicionar } = this.props;

    return (
      <div className="Form">
        <form>
          <div className="row">
            <div className="col s12 m4 l2 ">
              <label>Código
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={id}
                  name="id"
                  placeholder="Código"
                  autoFocus />
              </label>
            </div>
            <div className="col s12 m4 l5 ">
              <label>Nome
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Digite seu nome" />
              </label>
            </div>
            <div className="col s12 m4 l5 ">
              <label>Email
                <input
                  onChange={this.handleChange}
                  type="email"
                  value={email}
                  name="email"
                  placeholder="Digite seu e-mail " />
              </label>
            </div>
          </div>
        </form>
        
        <button
          onClick={() => this.handleCreateUser()}
          disabled={disableAdicionar}
          type="button"
          className="btn btn-secondary"
        >
          Adicionar
        </button>
      </div>
    )
  }
}

export default Form