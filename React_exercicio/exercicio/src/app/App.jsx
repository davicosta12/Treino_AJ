import './App.css';
import React, { Component } from 'react';
import {getAllUsers, createUser, getUser, updateUser, deleteUser } from '../API/http'

import Form from '../components/form/Form'
import Table from '../components/table/Table'
import Editar from '../components/editar/Editar'
import Loading from '../components/loadingBarrer/Loading'

class App extends Component {

  state = {
    users: [],
    user: {},
    formData: {},
    activeLoading: false,
    activeLoadingModal: false,
  }

  componentDidMount() {
    this.iniciaComOsDados();
  }

  hadleFormData(data) {
    this.setState({ formData: { ...this.state.formData, [data.name]: data.value }})
  } 

 iniciaComOsDados = () => {
    return new Promise( async (resolve, reject) => {
      try {
        const users = await getAllUsers();
        this.setState({ users });
        resolve();
      }

      catch (error) {
        // handle error
        alert('Ocorreu um erro ao processar as informações');
        reject(error)
      }

      finally {
        // always executed    
      }
    })
  }

  handleGetUser = async (userId, setAttribute) => {
    return new Promise( (resolve, reject) => {
      this.setState({ 
        user: { },
        activeLoadingModal: true,
      }, async () => {
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
          alert('Ocorreu um erro ao processar as informações');
        }
        finally {
          this.setState({ activeLoadingModal: false })
          setAttribute(false)
        }
      })
    })
  }

  handleEditUser = data =>
    this.setState({ user: { ...this.state.user, ...data } });

  enviaDado = (setAttribute, $value_inputs) => {
    return new Promise( async (resolve, reject) => { 
      this.setState({ activeLoading: true })
      const payload = {...this.state.formData}
      createUser(payload)
      .then(() =>
        this.iniciaComOsDados()
        .then(() => {
          alert("Usuário inserido com sucesso!")
        })
        .finally(() => {
          this.setState({ activeLoading: false })
          
        })
      )  
      .catch((error) => {
        if(error.status === 404)
          alert('Código não localizado') 
        else if (error.response && error.response.data && error.response.data.message)
          alert(error.response.data.message) 
        else
          alert('Ocorreu um erro ao processar as informações')
      })
      .finally(() => {
        this.setState({ activeLoading: false })
        setAttribute(false)
        for( let elem of $value_inputs) elem.value = '';
      })
    })
  }

  atualizaDado = (state) => {
    return new Promise( async (resolve, reject) => {
      this.setState({ activeLoadingModal: true })
      const payload = { ...state }

      const id = this.state.user.id 

      updateUser(id, payload)
      .then((data) => {
        this.iniciaComOsDados()
        .then(() => alert(data.message))
        .finally(() => {
          this.setState({ activeLoadingModal: false })
          window.instance.close()
        })
      
      })

      .catch(error => { 
        this.setState({ activeLoadingModal: false })
        alert(error)
      })
      .finally(() => {
        // always executed 

      });
    })
    }

  deletaDado = (id, setAttribute) => {
    return new Promise( async (resolve, reject) => {
      this.setState({ activeLoading: true })
      deleteUser(id)
      .then(() => {
        this.iniciaComOsDados()
        .then(() =>  alert("Usuário deletado com sucesso"))
        .finally(() => {
          this.setState({ activeLoading: false })
          setAttribute(false)
      })    

      })
      .catch((error) => {
        setAttribute(false)
        this.setState({ activeLoadingModal: false })
        alert(error)
      
      }) 
      .finally(() => {
    
      })
    })
  }

  render() {
    return (
      <div className="DataTable">
        <Form
          onChangeData={this.hadleFormData.bind(this)}
          onEnviarDados={this.enviaDado}
        />
        <Loading
          isActive={this.state.activeLoading}
         />
        <Table
          dados={this.state.users}
          ondeletaDado={this.deletaDado}
          onGetUser={this.handleGetUser}
          usuario={this.state.user}
          onAtualizaDado={this.atualizaDado}
          isActive={this.state.activeLoadingModal}
        />

      </div>
    )
  }
}

export default App