import './App.css';
import React, { Component } from 'react';
import {getAllUsers, createUser, getUser, updateUser, deleteUser } from '../API/http'
import insereToast from '../insereToast'

import Form from '../components/form/Form'
import Table from '../components/table/Table'
import Editar from '../components/editar/Editar'
import Loading from '../components/loadingBarrer/Loading'


const toastObj = { 
  html: '', 
  classes: 'rounded',
};

class App extends Component {
  state = {
    users: [],
    user: {},
    formData: {},
    activeLoading: false,
    activeLoadingModal: false,
  }

  componentDidMount() {
    this.getAllUsers();
  }

  handleFormData = (data) => {
    this.setState({ formData: { ...this.state.formData, [data.name]: data.value }})
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
        insereToast('Ocorreu um erro ao processar as informações', toastObj);
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
          insereToast('Ocorreu um erro ao processar as informações', toastObj);
        }
        finally {
          this.setState({ activeLoadingModal: false })
        }
      })
    })
  }

  createUser = (setEnabled, $value_inputs) => {
    return new Promise( async (resolve, reject) => { 
      this.setState({ activeLoading: true },
      async () => {
        try {
          const payload = {...this.state.formData}
          await createUser(payload)
          await this.getAllUsers()
          insereToast("usuario inserido com sucesso!", toastObj) 
        }
        catch(error) {
          if(error.status === 404)
            insereToast('Código não localizado', toastObj) 
          else if (error.response?.data?.message)
            insereToast(error.response.data.message, toastObj) 
          else
            insereToast('Ocorreu um erro ao processar as informações', toastObj)
        }
        finally {
          this.setState({ activeLoading: false })
          setEnabled(false)
          for( let elem of $value_inputs) elem.value = '';
        }
      })     
    })
  }

  handleUpdate = (state, setEnabled) => {
    return new Promise( async (resolve, reject) => {
      this.setState({ activeLoadingModal: true }, 
        async () => {
          try {
            const payload = { ...state }
            const id = this.state.user.id 
            const data = await updateUser(id, payload)
            await this.getAllUsers()
            insereToast(data.message, toastObj)
          }
          catch(error) {
            insereToast(error, toastObj)
          }
          finally {
            // always executed 
            
            this.setState({ activeLoading: false })
            window.instance.close()
          }
      })

    })
    }

  handleDelet = (id) => {
    return new Promise( async (resolve, reject) => {
      this.setState({ activeLoading: true },  
      async () => {
        try {
          await deleteUser(id)
          await this.getAllUsers()
          insereToast("Usuário deletado com sucesso", toastObj)
        }
        catch(error) {
          insereToast(error, toastObj)
        }
        finally {
          this.setState({ activeLoading: false })
        }

      })
    })
  }

  render() {
    const { user, users, activeLoadingModal, activeLoading } = this.state
    return (
      <div className="DataTable">
        <Form
          onChangeData={this.handleFormData}
          onEnviarDados={this.createUser}
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