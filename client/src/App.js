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
import AuthRoute from './components/layout/authRoute/AuthRoute';
import Home from './components/layout/home/Home';
// import UserProfile from './components/layout/userProfile/UserProfile';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToaster = isToasterVisible ? (
    <Toaster message={message} status={status} />
  ) : null;

  return (
    <Router>
      <Navigation />
      <AuthRoute exact path={home.link} component={Home} />
      <div className='container'>
        {showToaster}
        <Switch>
          <AuthRoute
            path={createInvoice.link}
            component={Invoice}
            type='private'
          />
          <AuthRoute path={login.link} component={Login} type='guest' />
          <AuthRoute
            exact
            path={yourInvoices.link}
            component={Invoices}
            type='private'
          />
          <AuthRoute
            exact
            path={`${yourInvoices.link}/:id`}
            component={SingleInvoice}
            type='private'
          />
          <AuthRoute
            path={`${yourInvoices.link}/edit/:id`}
            component={EditInvoice}
            type='private'
          />
          <AuthRoute path={signup.link} component={Signup} type='guest' />

          <Router />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
