import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { loginUser, clearErrors } from '../store/actions';
import Loader from '../../layout/loader/Loader';
import { NavLink } from 'react-router-dom';

import './Login.scss';

const Login = () => {
  const { isLoading } = useSelector(({ shared }) => shared);
  const { errorMessage, idMessage } = useSelector(({ auth }) => auth);
  const [msg, setMsg] = useState(null);
  const handleClearMsg = () => setMsg(null);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const LogUser = (userData) => {
    handleClearMsg();
    dispatch(loginUser(userData, history));
  };

  useEffect(() => {
    if (idMessage === 'LOGIN_FAIL') {
      setMsg(errorMessage);
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMsg(null);
    }
  }, [dispatch, errorMessage, idMessage]);

  return (
    <Form className='signup-form' onSubmit={handleSubmit(LogUser)}>
      <div className='signup-form'>
        <div className='form__sign'>
          <h2>Member Login</h2>
          {msg && <Alert variant='danger'>{msg}</Alert>}
          <hr />
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fa fa-paper-plane'></i>
                </span>
              </div>
              <Form.Control
                type='email'
                className='form-control'
                name='email'
                placeholder='Email Address'
                ref={register({ required: 'Email adress is required.' })}
              />
              <ErrorMessage errors={errors} name='email' as='p' />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fa fa-lock'></i>
                </span>
              </div>
              <Form.Control
                type='text'
                className='form-control'
                name='password'
                placeholder='Password'
                ref={register({ required: 'Password is required.' })}
              />
              <ErrorMessage errors={errors} name='password' as='p' />
            </div>
          </div>
          <div className='form-group'>
            <Button type='submit' className='btn btn-primary btn-lg '>
              Sign Up
            </Button>
          </div>
        </div>
        <div className='text-center'>
          <NavLink
            exact
            to='/sign-up'
            className='form-text float-right create-link'
          >
            Create an Account
          </NavLink>
        </div>
      </div>
    </Form>
  );
};
export default Login;
