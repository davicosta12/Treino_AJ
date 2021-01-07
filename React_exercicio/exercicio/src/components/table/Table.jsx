import './Table.css';
import React from 'react';

import Totalizador from '../totalizador/totalizador'

const Table = props => {
    const dados = props.dados;

    return (
        <div className="Tabela">
            <table className="table table-dark table-hover">
                <thead className="table-head">
                    <tr className="trow-head">
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map(user => (
                        <tr key={user.id}>
                            <td> {user.id} </td>
                            <td> {user.name} </td>
                            <td> {user.email} </td>
                            <td> 
                                <button 
                                    onClick={_ => props.ondeletaDado(user.id)} 
                                    className="btn btn-secondary">Excluir
                                </button> 
                            </td> 
                            <td>  
                                <button 
                                    onClick={() => {
                                        props.onsearchUser(user.id, user.name, user.email)
                                        props.ongetUser(user.id)
                                        props.onEditClick()
                                    }}
                                    data-target="modal1" 
                                    className="btn modal-trigger">Editar
                                </button> 
                            </td>
                        </tr>
                        ))
                    }
                </tbody>  
            </table> 
            <Totalizador dados={dados} />
        </div>
    )
}
    
export default Table