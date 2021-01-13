import './Loading.css';
import React from 'react';

const Loading = props => {
  const activeLoadingAdicionar = props.isActiveLoadingAdicionar;
  const activeLoadingExcluir = props.isActiveLoadingExcluir;
  const activeLoadingModal = props.isActiveLoadingModal;
  return (
    <div className={activeLoadingAdicionar || activeLoadingExcluir || activeLoadingModal  ? "progress" : "no-css"}>
      <div className="indeterminate"></div>
    </div>
  )
}

export default Loading 