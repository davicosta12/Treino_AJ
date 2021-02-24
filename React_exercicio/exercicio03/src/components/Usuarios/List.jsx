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
  activeShowbar: false,
  showBtnEdit: true,
  showbarMessage: '',
  severityShowbar: '',
}

class UsuariosList extends Component {
  state = INITIAL_STATE
  usersService = null;

  componentDidMount() {
    this.usersService = new UsersService(localStorage.getItem('token'));
    this.setState({ activeLoading: true }, async () => {
      await this.getListUsers()
    });
  }

  getListUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.usersService.getListUsers();
        this.setState({ users }, () => { resolve() });
      }
      catch (error) {
        this.errorHandler(error, 'error')
        reject(error);
      }
      finally {
        this.setState({ activeLoading: false })
      }
    })
  }

  handleCreateUser = () => {
    if (this.isNotvalidUser(this.state.user.usuario)) return;
    this.setState({ activeLoading: true, openModal: false }, async () => {
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
        this.setState({ activeLoading: false })
      }
    })
  }

  handleUpdateUser = () => {
    this.setState({ activeLoading: true, openModal: false }, async () => {
      try {
        const payload = { ...this.state.user }
        const response = await this.usersService.updateUser(payload)
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
        this.setState({ activeLoading: false })
      }
    })
  }

  handleDeleteUser = async (data) => {
    this.setState({ activeLoading: true }, async () => {
      try {
        await this.usersService.deleteUser(data.usuario)
        await this.getListUsers()
        this.successHandler(`${data.usuario} deletado com sucesso!`)
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

  handleChangeForm = ev => {
    const { name, value } = ev.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      }
    })
  }

  handleEditBtn = (data) => {
    const { usuario, status, isAdmin } = data;
    this.setState({
      user: { ...this.state.user, usuario, status, isAdmin },
      createMode: false,
      openModal: true
    })
  }

  handleAddBtn = () => {
    this.setState({ createMode: true, openModal: true, user: { ...INITIAL_STATE.user } })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, user: { ...INITIAL_STATE.user } })
  }

  handleOpenModal = () => {
    this.setState({ openModal: true })
  }

  handleResetSnackbar = () => {
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
    console.log(user)
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
    const { activeLoading, openModal,
      createMode, user, users, activeShowbar, showbarMessage, severityShowbar, showBtnEdit } = this.state;
    return <>
      <Snackbar
        activeShowbar={activeShowbar}
        showbarMessage={showbarMessage}
        severityShowbar={severityShowbar}
        onReset={this.handleResetSnackbar}
      />

      <Tabela
        items={users.map(user => Object.assign({
          obj: { ...user },
          label: {
            usuario: user.usuario,
            isAdmin: user.isAdmin ? 'Sim' : 'Não',
            status: user.status ? 'Ativo' : 'Inativo',
          }
        }))}
        columns={[
          { name: 'usuario', label: 'Usuário' },
          { name: 'isAdmin', label: 'Admin' },
          { name: 'status', label: 'Ativo' },
        ]}
        showBtnEdit={showBtnEdit}
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
      >
        <UsuariosForm
          user={user}
          onChange={this.handleChangeForm}
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
        className={Loading}
        activeLoading={activeLoading}
      />
    </>
  }
}

export default UsuariosList