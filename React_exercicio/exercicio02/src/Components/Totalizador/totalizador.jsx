import './totalizador.css';
import React from 'react';

const Totalizador = props => {
  const { users } = props;
  let soma = 0;
  for (let i = 0; i < users.length; i++) soma++;

  return (
    <div className="Totalizador">
      <p>Total: <span>{soma}</span></p>
    </div>
  )
}

export default Totalizador