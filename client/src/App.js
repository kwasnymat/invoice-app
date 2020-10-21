import React from 'react';

import { Nav, Form, Button } from 'react-bootstrap';

import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Invoices from './components/invoices/Invoices';

import routes from './routesDefinitions/routes';

import './App.scss';

const App = () => {
  const { home, createInvoice, yourInvoices, login, signup } = routes;
  return (
    <div>
      <Router>
        <div className='container'>
          <Navigation />
          <Switch>
            <Route path={createInvoice.link} />
            <Route exact path={home.link} />
            <Route path={login.link} />
            <Route path={yourInvoices.link} component={Invoices} />
            <Route path={signup.link} />
            <Route />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
