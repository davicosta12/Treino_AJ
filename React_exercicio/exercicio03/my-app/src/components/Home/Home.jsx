import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Menu from '../layout/Menu/Menu'
import Content from '../layout/Content/Content'

const INITIAL_STATE = {
  openModal: false,
  createMode: false,
}

class Home extends Component {
  state = INITIAL_STATE;

  handleOpenModal = (e) => {
    this.setState({ openModal: true })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  render() {
    const { openModal, createMode } = this.state;
    return (
      <div>

        <Router>
          <Menu />
          <Content 
            handleOpenModal={this.handleOpenModal} 
            handleCloseModal={this.handleCloseModal} 
            openModal={openModal} 
            createMode={createMode} 
            />
        </Router>

      </div>
    )
  }

}

export default Home