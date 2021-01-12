import './App.css';
import React, { Component } from 'react';
import {getAllUsers, createUser, getUser, updateUser, deleteUser } from '../API/http'
import insereToast from '../insereToast'

import Form from '../components/form/Form'
import Table from '../components/table/Table'
import Editar from '../components/editar/Editar'
import Loading from '../components/loadingBarrer/Loading'


class App extends Component {
  state = {
    users: [],
    user: {},
    activeLoading: false,
    activeLoadingModal: false,
    enableAdicionar: false,
  }

  componentDidMount() {
    this.getAllUsers();
  }

 getAllUsers = () => {
    return new Promise( async (resolve, reject) => {
      try {
        const users = await getAllUsers();
        this.setState({ users });
        resolve();
      }
      catch (error) {
        // handle error
        insereToast('Ocorreu um erro ao processar as informações');
        reject(error)
      }
      finally {
        // always executed    
      }
    })
  }

  handleGetUser = async (userId) => {
    return new Promise( (resolve, reject) => {
      this.setState({ 
        user: { },
        activeLoadingModal: true,
      },  
      async () => {
        try {
          // handle success
          const data = await getUser(userId);
          const { id, name, email, obs } = data;
          this.setState({ user: { id, name, email, obs } });
          resolve();
        }
        catch(err) {
          // handle error
          reject(err);
          insereToast('Ocorreu um erro ao processar as informações');
        }
        finally {
          this.setState({ activeLoadingModal: false })
        }
      })
    })
  }

  createUser = (state_do_form) => {
      this.setState({ activeLoading: true, enableAdicionar: true },
      async () => {
        try {
          const payload = {...state_do_form}
          await createUser(payload)
          await this.getAllUsers()
          insereToast("usuario inserido com sucesso!") 
        }
        catch(error) {
          if(error.status === 404)
            insereToast('Código não localizado') 
          else if (error.response?.data?.message)
            insereToast(error.response.data.message) 
          else
            insereToast('Ocorreu um erro ao processar as informações')
        }
        finally {
          this.setState({ activeLoading: false, enableAdicionar: false })
        }
      })     
  }

  handleUpdate = (state) => {
      this.setState({ activeLoadingModal: true }, 
        async () => {
          try {
            const payload = { ...state }
            const id = this.state.user.id 
            const data = await updateUser(id, payload)
            await this.getAllUsers()
            insereToast(data.message)
          }
          catch(error) {
            insereToast(error)
          }
          finally {
            // always executed 
            
            this.setState({ activeLoading: false })
            window.instance.close()
          }
      })

    }

  handleDelet = (id) => {
      this.setState({ activeLoading: true },  
      async () => {
        try {
          await deleteUser(id)
          await this.getAllUsers()
          insereToast("Usuário deletado com sucesso")
        }
        catch(error) {
          insereToast(error)
        }
        finally {
          this.setState({ activeLoading: false })
        }

      })
  }

  render() {
    const { user, users, activeLoadingModal, activeLoading, enableAdicionar } = this.state
    return (
      <div className="DataTable">
        <Form
          onEnviarDados={this.createUser}
          enableAdicionar={enableAdicionar}
        />
        <Loading
          isActiveLoading={activeLoading}
         />
        <Table
          dados={users}
          onDelet={this.handleDelet}
          onGetUser={this.handleGetUser}
          usuario={user}
          onUpdate={this.handleUpdate}
          isActiveLoading={activeLoadingModal}
        />

      </div>
    )
  }
}

export default App