import './App.css';
import React from 'react';
import axios from "axios"

import Form from '../components/form/Form'
import Table from '../components/table/Table'



const App = () => {

    const getAllUsers = () => {
        return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/users`)
          .then(resp => resolve(resp.data))
          .catch(error => reject(error))
        })
      }
      
    const iniciaComOsDados = () => {
        return new Promise( async (resolve, reject) => {
          try {
            const data = await getAllUsers();
            // handle success
            const userlist = data;
                                                             
            }
            
          catch(error) {
            // handle error
            
          } 
          finally {
            // always executed
            
          }
        })
      }

    return (
        <div className="DataTable">
            <Form></Form>
            <Table></Table>
        </div>       
    )
}

export default App