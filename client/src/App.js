import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CreateInvoice from './components/invoices/createInvoice/CreateInvoice';
import SingleInvoice from './components/invoices/singleInvoice/SingleInvoice';
import EditInvoice from './components/invoices/editInvoice/EditInvoice';
import Navigation from './components/layout/navigation/Navigation';
import AuthRoute from './components/layout/authRoute/AuthRoute';
import NotFound from './components/layout/notFound/NotFound';
import { loadUser } from './components/auth/store/actions';
import Toaster from './components/layout/toaster/Toaster';
import Footer from './components/layout/footer/Footer';
import Invoices from './components/invoices/Invoices';
import Signup from './components/auth/signup/Signup';
import Login from './components/auth/login/Login';
import Home from './components/layout/home/Home';
import User from './components/user/User';
import routes from './routes/routes';

import './App.scss';

const App = () => {
  const { isToasterVisible, message, status } = useSelector(
    ({ shared }) => shared
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { home, createInvoice, yourInvoices, login, signup, user } = routes;

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
            component={CreateInvoice}
            type='private'
          />
          <AuthRoute path={user.link} component={User} type='private' />
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
          <AuthRoute component={NotFound} />

          <Router />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
