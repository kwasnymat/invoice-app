import React from 'react';

import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

const AuthRoute = (props) => {
  const { isAuth } = useSelector(({ auth }) => auth);

  if (props.type === 'guest' && isAuth) return <Redirect to='/' />;
  else if (props.type === 'private' && !isAuth) return <Redirect to='/' />;

  return <Route {...props} />;
};

export default AuthRoute;
