import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewsApp from './App';
import ViewsLogin from './Login/Login';
import ViewsUsuariosList from './Usuarios/List';
import ViewsVendedoresList from './Vendedores/List';

const ViewsRoot = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={ViewsApp} />
        <Route path="/usuarios" component={ViewsUsuariosList} />
        <Route path="/vendedores" component={ViewsVendedoresList} />
        <Route path="/login" component={ViewsLogin} />
      </Switch>
    </Router>
  </div>
)

export default ViewsRoot