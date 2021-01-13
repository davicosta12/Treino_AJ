import './App.css';
import React, { Component } from 'react';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../services/UsersService';
import Form from '../components/form/Form'
import Table from '../components/table/Table'
import Loading from '../components/loadingBarrer/Loading'
import errorHandler from '../utils/errorHandler'
import showAlert from '../utils/showAlert';

class App extends Component {
  state = {
    users: [],
    user: {},
    activeLoading: false,
    activeLoadingModal: false,
    disableAdicionar: false,
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await getAllUsers();
        this.setState({ users }, () => resolve());
      }
      catch (error) {
        errorHandler(error);
        reject(error);
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
        catch (err) {
          errorHandler(err);
          reject(err);
        }
        finally {
          this.setState({ activeLoadingModal: false })
        }
      })
    })
  }

  handleCreateUser = user => {
    this.setState({
      activeLoading: true,
      disableAdicionar: true
    }, async () => {
      try {
        const payload = { ...user }
        await createUser(payload)
        await this.getAllUsers()
        showAlert("Usuário inserido com sucesso!")
      }
      catch (error) {
        if (error.status === 404)
          errorHandler(error, 'Código não localizado')
        else if (error.response?.data?.message)
          errorHandler(error, error.response.data.message)
        else
          errorHandler(error)
      }
      finally {
        this.setState({ activeLoading: false, disableAdicionar: false })
      }
    })
  }

  handleUpdateUser = user => {
    this.setState({ activeLoadingModal: true }, async () => {
      try {
        const payload = { ...user }
        const id = this.state.user.id
        const data = await updateUser(id, payload)
        await this.getAllUsers()
        showAlert(data.message)
      }
      catch (error) {
        errorHandler(error)
      }
      finally {
        this.setState({ activeLoading: false },
          () => window.instance.close()
        );
      }
    })
  }

  handleDeleteUser = (id) => {
    this.setState({ activeLoading: true }, async () => {
      try {
        await deleteUser(id)
        await this.getAllUsers()
        showAlert("Usuário deletado com sucesso")
      }
      catch (error) {
        errorHandler(error)
      }
      finally {
        this.setState({ activeLoading: false })
      }
    })
  }

  render() {
    const {
      user,
      users,
      activeLoadingModal,
      activeLoading,
      disableAdicionar,
    } = this.state;

    return (
      <div className="DataTable">
        <Form
          onCreateUser={this.handleCreateUser}
          disableAdicionar={disableAdicionar}
        />
        <Loading
          isActiveLoading={activeLoading}
        />
        <Table
          users={users}
          user={user}
          onGetUser={this.handleGetUser}
          onDeleteUser={this.handleDeleteUser}
          onUpdateUser={this.handleUpdateUser}
          isActiveLoading={activeLoadingModal}
        />
      </div>
    )
  }
}

export default App