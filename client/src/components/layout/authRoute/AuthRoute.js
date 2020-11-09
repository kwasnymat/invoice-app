import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const AuthRoute = (props) => {
  const { isAuth } = useSelector(({ auth }) => auth);

  if (props.type === 'guest' && isAuth) return <Redirect to='/' />;
  else if (props.type === 'private' && !isAuth) return <Redirect to='/login' />;

  return <Route {...props} />;
};

export default AuthRoute;
