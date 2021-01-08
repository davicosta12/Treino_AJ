import './Table.css';
import React from 'react';

import Totalizador from '../totalizador/totalizador'
import Editar from '../editar/Editar'

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
                    onClick={_ => { 
                        props.activeLoading()
                        props.ondeletaDado(user.id, props)
                    }}
                    className="btn btn-secondary">Excluir
                  </button>
                </td>
                <td>
                  <button
                    onClick={ _ => {     
                        props.activeLoadingModal()
                        props.ongetUser(user.id, props)     
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
      <Editar
        usuario={props.usuario}
        onAtualizaDado={props.onAtualizaDado}
        isActive={props.isActive}
        activeLoadingModal={props.activeLoadingModal}
        desactiveLoadingModal={props.desactiveLoadingModal}
      />
    </div>
    
  )
}

export default Table