import React from 'react';

import { Nav, Form, Button } from 'react-bootstrap';

import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Invoices from './components/invoices/Invoices';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Invoice from './components/createInvoice/CreateInvoice';

import routes from './routesDefinitions/routes';

import './App.scss';

const App = () => {
  const { home, createInvoice, yourInvoices, login, signup } = routes;
  return (
    <Router>
      <Navigation />
      <div className='container'>
        <Switch>
          <Route exact path={home.link} />
          <Route path={createInvoice.link} component={Invoice} />
          <Route path={login.link} component={Login} />
          <Route path={yourInvoices.link} component={Invoices} />
          <Route path={signup.link} component={Signup} />
          <Route />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
