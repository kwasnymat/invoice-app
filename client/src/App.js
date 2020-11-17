import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

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
  const { token } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { home, createInvoice, yourInvoices, login, signup, user } = routes;

  const showToaster = isToasterVisible ? (
    <Toaster message={message} status={status} />
  ) : null;

  return (
    <Router>
      <Navigation />

      <Container>
        {showToaster}

        <Switch>
          <AuthRoute exact path={home.link} component={Home} />

          <AuthRoute
            token={token}
            path={createInvoice.link}
            component={CreateInvoice}
            type='private'
          />
          <AuthRoute
            path={user.link}
            component={User}
            type='private'
            token={token}
          />
          <AuthRoute
            path={login.link}
            component={Login}
            type='guest'
            token={token}
          />
          <AuthRoute
            exact
            path={yourInvoices.link}
            component={Invoices}
            type='private'
            token={token}
          />
          <AuthRoute
            exact
            path={`${yourInvoices.link}/:id`}
            component={SingleInvoice}
            type='private'
            token={token}
          />
          <AuthRoute
            token={token}
            path={`${yourInvoices.link}/edit/:id`}
            component={EditInvoice}
            type='private'
          />
          <AuthRoute
            path={signup.link}
            component={Signup}
            type='guest'
            token={token}
          />
          <AuthRoute component={NotFound} />
          <Router />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
