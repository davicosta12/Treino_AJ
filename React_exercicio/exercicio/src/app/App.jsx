import './App.css';
import React, { Component } from 'react';
import {getAllUsers, createUser, getUser, updateUser, deleteUser } from '../API/http'

import Form from '../components/form/Form'
import Table from '../components/table/Table'
import Editar from '../components/editar/Editar'

class App extends Component {
  state = {
    users: [],
    formData: {},
    user: {},
    openModal: false,
  }

  componentDidMount() {
    this.iniciaComOsDados();
  }

  hadleFormData(data) {
    this.setState({ formData: { ...this.state.formData, [data.name]: data.value }})
  } 

  handleEditClick() {
    this.setState({ openModal: true })
  }

  async iniciaComOsDados() {
    try {
      const users = await getAllUsers();
      this.setState({ users });
    }

    catch (error) {
      // handle error
      console.log('Ocorreu um erro ao processar as informações');
    }

    finally {
      // always executed
    }
  }

  get_User = async (user_id) => {
    
    try {
    // handle success
      const codigo = user_id
      const data = await getUser(codigo);
      const userlist = data
      const {id, name, email, obs} = userlist
      this.setState({user:{id, name, email,obs}}) 
    }
    catch {
      // handle error
      console.log('Ocorreu um erro ao processar as informações');
     
    }
    finally {
      // always executed
    
    }
  }

  enviaDado = () => { 
    const payload = {
      'id': this.state.formData.codigo, 
      'name': this.state.formData.nome, 
      'email': this.state.formData.email,
      'obs': ''
    }
    createUser(payload)
      .then(() =>
        this.iniciaComOsDados()
        )  
      .catch((error) => {
        if(error.status === 404)
          console.log('Código não localizado') 
        else if (error.response && error.response.data && error.response.data.message)
          console.log(error.response.data.message) 
        else
          console.log('Ocorreu um erro ao processar as informações')
      })
  }

  atualizaDado = (name, email) => {
    const payload = {
      'name': name, 
      'email': email,
      'obs': ''
    }

    const id = this.state.user.id 

    updateUser(id, payload)
    .then((data) => {
      this.iniciaComOsDados()
        console.log(data.message) 
    })
    .catch(error => { 
      console.log(error)
    })
    .finally(() => {
      // always executed 
      
    });
    
  }

  deletaDado = (id) => {
    deleteUser(id)
    .then((message) => {
      this.iniciaComOsDados()
      
    })
    .catch((error) => {
      
    })
  }

  render() {
    return (
      <div className="DataTable">
        <Form
          onChangeData={this.hadleFormData.bind(this)}
          onEnviarDados={this.enviaDado}
        />
        <Table
          dados={this.state.users}
          ondeletaDado={this.deletaDado}
          ongetUser={this.get_User}
        />
        <Editar
          usuario={this.state.user}
          onAtualizaDado={this.atualizaDado}
        />
      </div>
    )
  }
}

export default App