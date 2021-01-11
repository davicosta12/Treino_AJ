import './Table.css';
import React, {useState, useEffect} from 'react';

import Totalizador from '../totalizador/totalizador'
import Editar from '../editar/Editar'

const Table = props => {
  const [ disableExcluir, setDisableExcluir ] = useState([]);
  const { dados, usuario, onUpdate, isActiveLoading, onGetUser } = props;

  useEffect(() => {
    setDisableExcluir(Array.from({ length: props.dados.length }, () => false))
  }, [props.dados.length])

  const handleDisableExcluir = (index, value) => {
    const _disableExcluir = [ ...disableExcluir ];
    _disableExcluir[index] = value;
    setDisableExcluir(_disableExcluir);
  }  

  const handleDelet = (id, index) => {
    setDisableExcluir(() => handleDisableExcluir(index, true));
    props.onDelet(id)
  }

  const handleGetUser = (id) => {
    props.onGetUser(id)
  }

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
            dados.map( (user, index) => (
              <tr key={user.id}>
                <td> {user.id} </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td>
                  <button
                    onClick={ () => {handleDelet(user.id, index)}}
                    disabled={disableExcluir && disableExcluir[index]}
                    className="btn btn-secondary">Excluir
                  </button>
                </td>
                <td>
                  <button
                    onClick={ () => {handleGetUser(user.id)}}
                    disabled={disableExcluir && disableExcluir[index]}
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
        usuario={usuario}
        onUpdate={onUpdate}
        isActiveLoading={isActiveLoading}
        onGetUser={onGetUser}
      />
    </div>
    
  )
  

}

export default Table