import React, { useEffect } from 'react';

import Navigation from './components/layout/navigation/Navigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './components/auth/store/actions';
import Invoices from './components/invoices/Invoices';
import Footer from './components/layout/footer/Footer';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import Invoice from './components/invoices/createInvoice/CreateInvoice';
import SingleInvoice from './components/invoices/singleInvoice/SingleInvoice';
import EditInvoice from './components/invoices/editInvoice/EditInvoice';
import Toaster from './components/layout/toaster/Toaster';

import routes from './routes/routes';

import './App.scss';

const App = () => {
  const { home, createInvoice, yourInvoices, login, signup } = routes;

  const { isToasterVisible, message, status } = useSelector(
    ({ shared }) => shared
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const showToaster = isToasterVisible ? (
    <Toaster message={message} status={status} />
  ) : null;

  return (
    <Router>
      <Navigation />
      <div className='container'>
        {showToaster}
        <Switch>
          <Route exact path={home.link} />
          <Route path={createInvoice.link} component={Invoice} />
          <Route path={login.link} component={Login} />
          <Route exact path={yourInvoices.link} component={Invoices} />
          <Route
            exact
            path={`${yourInvoices.link}/:id`}
            component={SingleInvoice}
          />
          <Route
            path={`${yourInvoices.link}/edit/:id`}
            component={EditInvoice}
          />
          <Route path={signup.link} component={Signup} />

          <Route />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
