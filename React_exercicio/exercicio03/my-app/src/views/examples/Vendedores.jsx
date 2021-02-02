import React from 'react'

import Modal from '../../components/common/Modal/Modal'
import Tabela from '../../components/common/Table/Table'
import Fab from '../../components/common/Fab/Fab'

const Vendedor = props => {
  const { handleOpenModal, openModal, createMode, handleCloseModal } = props
  return (
    <main className="Vendedores">
      
      <h1>Vendedores</h1>

      <Tabela
        columns={['Código', 'Nome', 'Ativo']}
        handleOpenModal={handleOpenModal}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        createMode={createMode}
        title="Vendedor"
        placeholder={
          [
            'Digite o código',
            'Digite o nome'
          ]
        }
        type={['number', 'text']}
        label={['Código', 'Nome']}
      />
      <div className="btnAdd">
        <Fab
          onClick={handleOpenModal}
          title="Adicionar"
          variant="round"
          size="small"
          label="add"
          color="primary"
          iconAdd={true}
        />
      </div>
    </main>
  )
}

export default Vendedor