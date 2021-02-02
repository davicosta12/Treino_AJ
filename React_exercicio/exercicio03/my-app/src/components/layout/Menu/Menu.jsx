import './Menu.css'
import React from 'react'

import { Link } from 'react-router-dom'

const Menu = props => (
  <header className="Menu">
    <nav>
      <ul>
        <div className="leftSide">
          <li>
            <Link to="/table/usuarios">Usuários</Link>
          </li>
          <li>
            <Link to="/table/vendedores">Vendedores</Link >
          </li>
        </div>
        <div className="rightSide">
          <li>
            <p className="Menu-ul-li-p">Usuário: Davi</p>
          </li>
          <li>
            <Link  to="/">Sair</Link>
          </li>
        </div>
      </ul>
    </nav>
  </header>
)

export default Menu