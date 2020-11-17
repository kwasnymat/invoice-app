import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router';

const AuthRoute = (props) => {
  const { isLoadingUser, isAuth } = useSelector(({ auth }) => auth);
  const { isToasterVisible, message, status, isLoading } = useSelector(
    ({ shared }) => shared
  );

  console.log(isAuth);
  console.log(props.isAuth);
  if (props.type === 'guest' && isAuth) return <Redirect to='/' />;
  else if (props.type === 'private' && !isAuth) return null;

  return <Route {...props} />;
};

export default AuthRoute;
