import React, { Component } from 'react';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../../../Services/UsersService';
import Modal from '../../Modal/modal'
import checkValidation from '../../../Utils/validacoes'
import Snackbar from '../../common/Snackbar/Snackbar'


const INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  obs: '',
}

class Home extends Component {
  state = {
    users: [],
    user: {},
    activeBtnCreate: false,
    activeBtnUpdate: false,
    activeLoadingModal: false,
    activeShowbar: false,
    showbarMessage: '',
    severityShowbar: '',
  }

  async componentDidMount() {
    this.setState({ activeLoadingModal: true })
    await this.getAllUsers()
    this.setState({ activeLoadingModal: false })
  }

  setShowbar = () => {
    this.setState({
      activeShowbar: false,
      showbarMessage: '',
      severityShowbar: '',
    })
  }

  setShowBtn = (nameBtn, boolean) => {
    if (nameBtn === 'activeBtnCreate' && boolean === true) {
      this.setState({ activeBtnCreate: true })
    } else if (nameBtn === 'activeBtnCreate' && boolean === false) {
      this.setState({ activeBtnCreate: false })
    } else if (nameBtn === 'activeBtnUpdate' && boolean === true) {
      this.setState({ activeBtnUpdate: true })
    } else {
      this.setState({ activeBtnUpdate: false })
    }
  }

  isNotvalidUser = user => {
    const { id, name, email, obs } = user
    const { notValid, message } = checkValidation([id, name, email, obs])
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

  errorHandler = (err, severity, message = null) => {
    console.error(err);
    const defaultMessage = 'Ocorreu um erro ao processar as informações';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: `${severity}`
    });
  }

  successHandler = (message = null) => {
    const defaultMessage = 'Operação concluída com sucesso!';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: 'success'
    })
  }

  getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await getAllUsers();
        this.setState({ users }, () => resolve());
      }
      catch (error) {
        this.errorHandler(error, 'error')
        reject(error);
      }
      finally {
        this.setState({})
      }
    })
  }

  handleGetUser = async (userId) => {
    return new Promise((resolve, reject) => {
      this.setState({
        user: {},
        activeLoadingModal: true,
      }, async () => {
        try {
          const data = await getUser(userId);
          this.setState({ user: { ...data } }, () => resolve());
        }
        catch (error) {
          this.errorHandler(error, 'error')
          reject(error);
        }
        finally {
          this.setState({ activeLoadingModal: false })
        }
      })
    })
  }

  handleCreateUser = async (user, handleClose) => {
    if (this.isNotvalidUser(user)) return;
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...user }
        await createUser(payload)
        await this.getAllUsers()
        this.successHandler(`Usuário id:${user.id} inserido com sucesso!`)
      }
      catch (error) {
        if (error.status === 404)
          this.errorHandler(error, 'error', 'Código não localizado')
        else if (error.response?.data?.message)
          this.errorHandler(error, 'error', error.response.data.message)
        else
          this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false })
        handleClose()
      }
    })
  }

  handleUpdateUser = (user, handleClose) => {
    if (this.isNotvalidUser(user)) return;
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...user }
        const id = this.state.user.id
        const data = await updateUser(id, payload)
        await this.getAllUsers()
        this.successHandler(`Usuário id:${id} ${data.message}`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false })
        handleClose()
      }
    })
  }

  handleDeleteUser = (id) => {
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        await deleteUser(id)
        await this.getAllUsers()
        this.successHandler(`Usuário id:${id} deletado com sucesso`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false })

      }
    })
  }

  handleClearForm = () => this.setState({ user: INITIAL_STATE });

  render() {
    const {
      user,
      users,
      activeLoadingModal,
      activeBtnCreate,
      activeBtnUpdate,
      activeShowbar,
      showbarMessage,
      severityShowbar,
    } = this.state;

    return (
      <div>
        <Snackbar
          activeShowbar={activeShowbar}
          showbarMessage={showbarMessage}
          setShowbar={this.setShowbar}
          severity={severityShowbar}
        />

        <div className="div-Modal">
          <Modal
            users={users}
            user={user}
            onDeleteUser={this.handleDeleteUser}
            onUpdateUser={this.handleUpdateUser}
            activeBtnCreate={activeBtnCreate}
            activeBtnUpdate={activeBtnUpdate}
            onCreateUser={this.handleCreateUser}
            onGetUser={this.handleGetUser}
            setShowBtn={this.setShowBtn}
            activeLoadingModal={activeLoadingModal}
            onClearForm={this.handleClearForm}
          />
        </div>
      </div>
    )
  }
}

export default Home;