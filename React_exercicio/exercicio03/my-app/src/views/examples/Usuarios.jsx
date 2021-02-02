import React from 'react'

import Modal from '../../components/common/Modal/Modal'
import Tabela from '../../components/common/Table/Table'
import Fab from '../../components/common/Fab/Fab'

const Usuario = props => {
  const { openModal, createMode, handleCloseModal, handleOpenModal } = props
  return (
    <main className="Usuario">

      <h1>Usuários</h1>

      <Tabela
        columns={['Usuário', 'Administrador', 'Ativo']}
        handleOpenModal={handleOpenModal}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        createMode={createMode}
        title="Usuário"
        placeholder={
          [
            'Digite o usuário',
            'Digite o administrador'
          ]
        }
        type={['text']}
        label={['Usuário', 'Administrador']}
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

export default Usuario