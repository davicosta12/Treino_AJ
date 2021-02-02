import './Content.css'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Vendedores from '../../../views/examples/Vendedores'
import Usuarios from '../../../views/examples/Usuarios'
import Login from '../../../views/examples/Login'

const Content = props => {
  const {handleOpenModal, createMode, openModal, handleCloseModal} = props
  return (
    <main className="Content">
      <Switch>
        <Route path="/table/usuarios">
          <Usuarios handleOpenModal={handleOpenModal} openModal={openModal} createMode={createMode} handleCloseModal={handleCloseModal} />
        </Route>
        <Route path="/table/vendedores">
          <Vendedores handleOpenModal={handleOpenModal} openModal={openModal} createMode={createMode} handleCloseModal={handleCloseModal} />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <Login />
        </Route>
      </Switch>
    </main>
  )
}

export default Content