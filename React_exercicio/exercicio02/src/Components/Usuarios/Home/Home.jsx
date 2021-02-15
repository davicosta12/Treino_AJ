import React, { Component } from 'react';
import Modal from '../Modal/Modal'
import UsersService from '../../../Services/UsersService';
import checkValidation from '../../../Utils/validacoes'
import Snackbar from '../../common/Snackbar/Snackbar'
import Table from '../../common/Table/Table';
import Fab from '../../common/Fab/Fab'
import Loading from '../../common/Loading/Loading'


const INITIAL_STATE = {
  users: [],
  user: { id: '', name: '', email: '', obs: '' },
  createMode: true,  // true: Modo de criação / false: Modo de edição
  activeLoadingModal: false,
  activeShowbar: false,
  showbarMessage: '',
  severityShowbar: '',
  openModal: false,
}

class Home extends Component {
  
  state = INITIAL_STATE;

  usersService = null;

  componentDidMount() {
    this.usersService = new UsersService();
    this.setState({ activeLoadingModal: true }, async () => {
      await this.getAllUsers()
    });
  }

  setShowbar = () => {
    this.setState({
      activeShowbar: false,
      showbarMessage: '',
      severityShowbar: '',
    })
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
        const users = await this.usersService.getAllUsers();
        this.setState({ users }, () => resolve());
      }
      catch (error) {
        this.errorHandler(error, 'error')
        reject(error);
      }
      finally {
        this.setState({ activeLoadingModal: false });
      }
    })
  }

  handleGetUser = async (userId) => {
    return new Promise((resolve, reject) => {
      this.setState({
        user: { ...INITIAL_STATE.user },
        activeLoadingModal: true,
      }, async () => {
        try {
          const data = await this.usersService.getUser(userId);
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

  handleCreateUser = async (user) => {
    if (this.isNotvalidUser(user)) return;
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...user }
        await this.usersService.createUser(payload)
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
      }
    })
  }

  handleUpdateUser = (user) => {
    if (this.isNotvalidUser(user)) return;
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...user }
        const id = this.state.user.id
        const data = await this.usersService.updateUser(id, payload)
        await this.getAllUsers()
        this.successHandler(`Usuário id:${id} ${data.message}`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false })
        this.handleCloseModal();
      }
    })
  }

  handleDeleteUser = (id) => {
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        await this.usersService.deleteUser(id)
        await this.getAllUsers()
        this.successHandler(`Usuário id:${id} deletado com sucesso`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
      }
      finally {
        this.setState({ activeLoadingModal: false });
        this.handleCloseModal();
      }
    })
  }

  handleClearForm = () => this.setState({ user: { ...INITIAL_STATE.user } });

  handleClickAddBtn = () => {
    this.setState({
      createMode: true,
      openModal: true,
    }, () => {
      this.handleClearForm();
    });
  }

  handleClickEditBtn = async id => {
    await this.handleGetUser(id);
    this.setState({
      createMode: false,
      openModal: true,
    });
  }

  handleOpenModal = () => this.setState({ openModal: true })

  handleCloseModal = () => this.setState({ openModal: false })

  render() {
    const {
      user,
      users,
      createMode,
      openModal,
      activeLoadingModal,
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

        <Table
          items={users}
          columns={[
            { name: 'id', label: 'Código'},
            { name: 'name', label: 'Nome' },
            { name: 'email', label: 'Email' },
          ]}
          onClickEditBtn={this.handleClickEditBtn}
          onClickDeleteBtn={this.handleDeleteUser}
        />

        <Modal
          open={openModal}
          user={user}
          createMode={createMode}
          onClose={this.handleCloseModal}
          onCreateUser={this.handleCreateUser}
          onUpdateUser={this.handleUpdateUser}
        />

        <div className="btnAdd">
          <Fab
            title="Adicionar"
            variant="round"
            size="small"
            label="add"
            color="primary"
            iconAdd={true}
            onClick={this.handleClickAddBtn}
          />
        </div>

        <Loading activeLoadingModal={activeLoadingModal} />

      </div>
    )
  }
}

export default Home;