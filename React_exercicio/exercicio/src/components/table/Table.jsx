import './Table.css';
import React, {useState} from 'react';

import Totalizador from '../totalizador/totalizador'
import Editar from '../editar/Editar'

const Table = props => {
  const [buttonAttribute, setAttribute] = useState(false);
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
                        setAttribute(true)
                        props.ondeletaDado(user.id, setAttribute)
                    }}
                    disabled={buttonAttribute ? true : false}
                    className="btn btn-secondary">Excluir
                  </button>
                </td>
                <td>
                  <button
                    onClick={ () => {  
                        setAttribute(true)   
                        props.onGetUser(user.id, setAttribute);
                    }}
                    data-target="modal1"
                    disabled={buttonAttribute ? true : false}
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
        onGetUser={props.onGetUser}
      />
    </div>
    
  )
}

export default Table