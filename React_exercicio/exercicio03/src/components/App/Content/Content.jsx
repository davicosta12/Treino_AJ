import './Content.css'
import React from 'react'

const AppContent = props => {
  return (
    <main className="Content">
      { props.children }
    </main>
  )
}

export default AppContent