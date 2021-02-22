import React, { Component } from 'react'
import UsersService from '../../Services/UsersService'

import UsuariosForm from './Form/Form'
import Modal from '../../components/common/Modal/Modal'
import Tabela from '../../components/common/Table/Table'
import Fab from '../../components/common/Fab'
import Loading from '../../components/common/Loading/Loading'
import Snackbar from '../common/Snackbar/Snackbar'
import checkValidation from '../../util/validacoes'

const INITIAL_STATE = {
  users: [],
  user: { usuario: "", urlPerfil: "", isOperador: true, status: false, isAdmin: false },
  openModal: false,
  createMode: false,
  activeLoading: false,
  activeLoadingModal: false,
  activeShowbar: false,
  showbarMessage: '',
  severityShowbar: '',
}

class UsuariosList extends Component {
  state = INITIAL_STATE
  usersService = null;

  componentDidMount() {
    this.usersService = new UsersService(localStorage.getItem('token'));
    this.getListUsers();
  }

  setUserUsuario = (usuario) => {
    this.setState({ user: { ...this.state.user, usuario } });
  }

  setUserStatus = (status) => {
    this.setState({ user: { ...this.state.user, status } });
  }

  setUserAdmin = (isAdmin) => {
    this.setState({ user: { ...this.state.user, isAdmin } });
  }

  setUser = (usuario = '', status = '', isAdmin = '') => {
    if (status === '' && isAdmin === '' ) {
      this.setUserUsuario(usuario)
      console.log(this.state.user)
    }
    if (status !== '' && isAdmin === '' && usuario === '')
      this.setUserStatus(status)
    if (status === '' && isAdmin !== '' && usuario === '')
      this.setUserAdmin(isAdmin)
  }

  handleEditBtn = (usuario, status, isAdmin) => {
    if (status === "Sim" && isAdmin === "Sim") {
      status = true;
      isAdmin = true;
    } else if (status === "Sim" && isAdmin === "Nao") {
      status = true;
      isAdmin = false;
    } else if (status === "Nao" && isAdmin === "Sim") {
      status = false;
      isAdmin = true;
    } else {
      status = false;
      isAdmin = false;
    }
    this.setState({ user: { ...this.state.user, usuario, status, isAdmin }, createMode: false, openModal: true })
  }

  handleAddBtn = () => {
    this.setState({ createMode: true, openModal: true, user: { ...INITIAL_STATE.user } })
  }

  getListUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.usersService.getListUsers();
        const newUsers = users.map((user) => user)
        newUsers.map((user) => {
          user['status'] ? user['status'] = 'Sim' : user['status'] = 'Nao';
          user['isAdmin'] ? user['isAdmin'] = 'Sim' : user['isAdmin'] = 'Nao';
        })
        this.setState({ users: newUsers }, () => { resolve() });
        console.log(newUsers)
      }
      catch (error) {
        this.errorHandler(error, 'error')
        reject(error);
      }
      finally {
        console.log("finally")
      }
    })
  }

  handleCreateUser = () => {
    if (this.isNotvalidUser(this.state.user.usuario)) return;
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...this.state.user }
        const response = await this.usersService.createUser(payload)
        await this.getListUsers()
        this.successHandler(response.mensagem)
      }
      catch (error) {
        if (error.response?.data?.mensagem)
          this.errorHandler(error, 'error', error.response.data.mensagem)
        else
          this.errorHandler(error, 'error')
        console.log(error)
      }
      finally {
        this.setState({ activeLoadingModal: false, openModal: false })

      }
    })
  }

  handleUpdateUser = () => {
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...this.state.user }
        const response = await this.usersService.updateUser(payload)
        console.log(response)
        await this.getListUsers()
        this.successHandler(response.mensagem)
      }
      catch (error) {
        if (error.response?.data?.mensagem)
          this.errorHandler(error, 'error', error.response.data.mensagem)
        else
          this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false, openModal: false })
      }
    })
  }

  handleDeleteUser = async (id) => {
    this.setState({ activeLoading: true }, async () => {
      try {
        await this.usersService.deleteUser(id)
        await this.getListUsers()
        this.successHandler(`${id} deletado com sucesso!`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
        console.log(error)
      }
      finally {
        this.setState({ activeLoading: false, openModal: false })
      }
    })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, user: { ...INITIAL_STATE.user } })
  }

  handleOpenModal = () => {
    this.setState({ openModal: true })
  }

  setShowbar = () => {
    this.setState({
      activeShowbar: false,
      showbarMessage: '',
      severityShowbar: '',
    })
  }

  successHandler = (message = null) => {
    const defaultMessage = 'Operação concluída com sucesso!';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: 'success'
    })
  }

  errorHandler = (err, severity, message = null) => {
    console.error(err);
    const defaultMessage = 'Ocorreu um erro ao processar as informações';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: `${severity}`
    })
  }

  isNotvalidUser = user => {
    const { notValid, message } = checkValidation([...user])
    if (notValid) {
      this.setState({
        activeShowbar: true,
        showbarMessage: message,
        severityShowbar: 'warning',
      })
      return true;
    }
    return false;
  }

  render() {
    const { activeLoading, activeLoadingModal, openModal,
      createMode, user, users, activeShowbar, showbarMessage, severityShowbar } = this.state;
    return <>
      <Snackbar
        activeShowbar={activeShowbar}
        showbarMessage={showbarMessage}
        severityShowbar={severityShowbar}
        setShowbar={this.setShowbar}
      />

      <Tabela
        items={users}
        columns={[
          { name: 'usuario', label: 'Usuário' },
          { name: 'isAdmin', label: 'Admin' },
          { name: 'status', label: 'Ativo' },
        ]}
        onClickDelete={this.handleDeleteUser}
        onClickEdit={this.handleEditBtn}
      />

      <Modal
        open={openModal}
        onClose={this.handleCloseModal}
        onConfirm={createMode ? this.handleCreateUser : this.handleUpdateUser}
        title="Usuário"
        createMode={createMode}
        confirmBtnTitle='Confirmar'
        confirmBtnLabel='edit'
        activeLoadingModal={activeLoadingModal}
      >
        <UsuariosForm
          user={user}
          setUser={this.setUser}
          createMode={createMode}
        />
      </Modal>

      <div className="btnAdd">
        <Fab
          onClick={this.handleAddBtn}
          title="Adicionar"
          variant="round"
          size="small"
          label="add"
          color="primary"
          iconAdd={true}
        />
      </div>

      <Loading
        activeLoading={activeLoading}
      />
    </>
  }
}

export default UsuariosList