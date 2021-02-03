import './Menu.css'
import React from 'react'
import { Link } from 'react-router-dom'

const AppMenu = props => ( 
  <header className="Menu">
    <nav>
      <ul>
        <div className="leftSide">
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link to="/vendedores">Vendedores</Link >
          </li>
        </div>
        <div className="rightSide">
          <li>
            <p className="Menu-ul-li-p">Usuário: Davi</p>
          </li>
          <li>
            <Link to="/login">Sair</Link>
          </li>
        </div>
      </ul>
    </nav>
  </header>
)

export default AppMenu