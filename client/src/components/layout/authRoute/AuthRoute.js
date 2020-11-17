import React from 'react';

import { Redirect, Route } from 'react-router';

const AuthRoute = ({ type, token, ...props }) => {
  if (type === 'guest' && token) return <Redirect to='/' />;
  else if (type === 'private' && !token) return <Redirect to='/' />;

  return <Route {...props} />;
};

export default AuthRoute;
