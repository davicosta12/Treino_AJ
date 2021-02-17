import React, {Component} from 'react'

import AppMenu from '../components/App/Menu/Menu';
import AppContent from '../components/App/Content/Content';


class App extends Component {
  
  render() {
    return <>
      <AppMenu />
      <AppContent>
        {this.props.children}
      </AppContent>
    </>
  }
}

export default App