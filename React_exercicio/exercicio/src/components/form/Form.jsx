import './Form.css';
import React, {Component, useEffect} from 'react';
import {isValid, isValidTextArea} from '../../validacoes'

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
    if(prevProps.enableAdicionar !== this.props.enableAdicionar && !this.props.enableAdicionar) this.setState(INITIAL_STATE)
  }

  handleFormData = (data) => {
    this.setState( { [data.name]: data.value } )
  } 

  handleChange = ({ target: { name, value }}) => {
    this.handleFormData({ name, value })
    this.setState({[name]: value})
  }

  handleCreateUser = () => {
    if(isValid([this.state.id, this.state.name, this.state.email])) return;
    this.props.onEnviarDados(this.state) 
  }

  render() {
    return (
      <div className="Form">
        <form>
          <div className="row">
            <div className="col s12 m4 l2 ">
              <label>Código
                <input
                  onChange={ev => this.handleChange(ev)}
                  type="text"
                  value={this.state.id}
                  name="id"
                  placeholder="Código"
                  autoFocus />
              </label>
            </div>
            <div className="col s12 m4 l5 ">
              <label>Nome
                <input
                  onChange={ev => this.handleChange(ev)}
                  type="text"
                  value={this.state.name}
                  name="name"
                  placeholder="Digite seu nome" />
              </label>
            </div>
            <div className="col s12 m4 l5 ">
              <label>Email
                <input
                  onChange={ev => this.handleChange(ev)}
                  type="email"
                  value={this.state.email}
                  name="email"
                  placeholder="Digite seu e-mail " />
              </label>
            </div>
          </div>
        </form>
        <button
          onClick={() => {this.handleCreateUser()}}
          disabled={this.props.enableAdicionar}
          type="button"
          className="btn btn-secondary">
          Adicionar</button>
      </div>
    )
  }
}

export default Form