import React from 'react'

import AppMenu from '../components/App/Menu/Menu';
import AppContent from '../components/App/Content/Content';


const App = props => {
  return <>
    <AppMenu />
    <AppContent>
      { props.children }
    </AppContent>
  </>
}

export default App