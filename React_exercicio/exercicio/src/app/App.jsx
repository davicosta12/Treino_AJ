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
    formData: {},
    user: {},
    activeLoagind: false,
    activeLoadingModal: false,
  }

  componentDidMount() {
    this.iniciaComOsDados();
  }

  hadleFormData(data) {
    this.setState({ formData: { ...this.state.formData, [data.name]: data.value }})
  } 

  handleActiveLoading() {
    this.setState({ activeLoagind: true })
  }

  handleDesactiveLoading() {
    this.setState({ activeLoagind: false })
  }

  handleActiveLoadingModal() {
    this.setState({ activeLoadingModal: true })
  }

  handleDesactiveLoadingModal() {
    this.setState({ activeLoadingModal: false })
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
        console.log('Ocorreu um erro ao processar as informações');
        reject(error)
      }

      finally {
        // always executed    
      }
    })
  }

  get_User = async (user_id) => {
    return new Promise( async (resolve, reject) => {
      try {
      // handle success
        const codigo = user_id
        const data = await getUser(codigo);
        const userlist = data
        const {id, name, email, obs} = userlist
        this.setState({user:{id, name, email,obs}})
        resolve()
      }
      catch {
        // handle error
        reject()
        console.log('Ocorreu um erro ao processar as informações');
      }
      finally {
        // always executed 

      }
    })
  }

  enviaDado = (props) => { 
    const payload = {
      'id': this.state.formData.codigo, 
      'name': this.state.formData.nome, 
      'email': this.state.formData.email,
      'obs': ''
    }
    createUser(payload)
      .then(() =>
        this.iniciaComOsDados().then(() => {
          console.log("Usuário inserido com sucesso!")
        })
        .finally(() => {
          props.desactiveLoading()
        })
      )  
      .catch((error) => {
        props.desactiveLoading()
        if(error.status === 404)
          console.log('Código não localizado') 
        else if (error.response && error.response.data && error.response.data.message)
          console.log(error.response.data.message) 
        else
          console.log('Ocorreu um erro ao processar as informações')
      })
      .finally(() => {
        
      })
  }

  atualizaDado = (state, setState) => {
    const payload = {
      'name': state.name, 
      'email': state.email,
      'obs': state.obs,
    }

    const id = this.state.user.id 

    updateUser(id, payload)
    .then((data) => {
      this.iniciaComOsDados()
      .then(() => console.log(data.message))
    })

    .catch(error => { 
      console.log(error)
    })
    .finally(() => {
      // always executed 
      setState()
    });
    
  }

  deletaDado = (id, props) => {
    deleteUser(id)
    .then(() => {
      this.iniciaComOsDados().then(_ =>  console.log("Usuário deletado com sucesso"))
    .finally(() => {
      props.desactiveLoading()
    })
      
    })
    .catch((error) => {
      props.desactiveLoading()
    }) 
    .finally(() => {
      
    })
  }

  render() {
    return (
      <div className="DataTable">
        <Form
          onChangeData={this.hadleFormData.bind(this)}
          onEnviarDados={this.enviaDado}
          activeLoading={this.handleActiveLoading.bind(this)}
          desactiveLoading={this.handleDesactiveLoading.bind(this)}
        />
        <Loading
          isActive={this.state.activeLoagind}
         />
        <Table
          dados={this.state.users}
          ondeletaDado={this.deletaDado}
          ongetUser={this.get_User}
          activeLoading={this.handleActiveLoading.bind(this)}
          desactiveLoading={this.handleDesactiveLoading.bind(this)}
          activeLoadingModal={this.handleActiveLoadingModal.bind(this)}
          desactiveLoadingModal={this.handleDesactiveLoadingModal.bind(this)}
          usuario={this.state.user}
          onAtualizaDado={this.atualizaDado}
          isActive={this.state.activeLoadingModal}
        />

      </div>
    )
  }
}

export default App