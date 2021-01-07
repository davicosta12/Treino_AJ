import './Editar.css';
import React, { Component } from 'react';

class Editar extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            email: '',
          }
    }

    render() {
        return (
            <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Editar Formulário</h4>  
                        <label>Código
                            <input 
                                readOnly  
                                type="text"   
                                name="codigo-modal" 
                                className="label-input-modal label-input-cod-modal form-control" 
                                placeholder="Novo código" />
                        </label>
                        <label>Nome
                            <input
                                onChange={(event) => {
                                    let name = event.target.value;
                                    this.setState({name});
                                }}
                                value={this.name}
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
                                    this.setState({email});
                                }}
                                value={this.email}
                                type="email" 
                                name="email-modal" 
                                className="label-input-modal form-control" 
                                placeholder="Digite um e-mail diferente" />
                        </label>
                        <label htmlFor="textarea1">Textarea</label>
                        <textarea className="materialize-textarea" placeholder="Observações" maxLength="80"></textarea>
                    </div>

                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                        <a 
                            onClick={() => {
                                this.props.onAtualizaDado(this.name, this.email)
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