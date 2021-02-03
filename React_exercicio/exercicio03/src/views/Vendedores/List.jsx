import React from 'react'

import ViewsApp from '../App';
import VendedoresList from '../../components/Vendedores/List';

const ViewsVendedoresList = props => {
  return (
    <ViewsApp>
      <main className="Usuario">
        <h1>Vendedores</h1>
        <VendedoresList />
      </main>
    </ViewsApp>
  )
}

export default ViewsVendedoresList