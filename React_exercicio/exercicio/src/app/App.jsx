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

  searchUser(id, name, value) {
    this.setState({user: {id, name, value}})

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
      const id = user_id
      console.log(id)
      const data = await getUser(id);
      const userlist = data
      const obs = userlist.obs
      for(let user of this.state.users) if(user.id === id) user['obs'] = obs;
       
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
        <Form onChangeData={this.hadleFormData.bind(this)} onEnviarDados={this.enviaDado}></Form>
        <Table dados={this.state.users} ondeletaDado={this.deletaDado} onsearchUser={this.searchUser.bind(this)} ongetUser={this.get_User} onEditClick={this.handleEditClick.bind(this)}></Table>
        {this.state.openModal && <Editar usuario={this.state.user} onAtualizaDado={this.atualizaDado}></Editar>}
      </div>
    )
  }
}

export default App