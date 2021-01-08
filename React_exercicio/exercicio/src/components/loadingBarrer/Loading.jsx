import './Loading.css';
import React from 'react';

const Loading = props => {
  const active = props.isActive;
  return (
    <div className={active ? "progress" : "no-css"}>
        <div className="indeterminate"></div>
    </div> 
    )
}

export default Loading 