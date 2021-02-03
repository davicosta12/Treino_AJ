import React from 'react'

import ViewsApp from '../App';
import UsuariosList from '../../components/Usuarios/List';

const ViewsUsuariosList = props => {
  return (
    <ViewsApp>
      <main className="Usuario">
        <h1>Usuários</h1>
        <UsuariosList />
      </main>
    </ViewsApp>
  )
}

export default ViewsUsuariosList