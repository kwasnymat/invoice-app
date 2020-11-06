import React, { useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { registerUser } from '../store/actions';
import Loader from '../../layout/loader/Loader';

import './Signup.scss';

import { NavLink } from 'react-router-dom';

const Signup = () => {
  const { isLoading } = useSelector(({ shared }) => shared);

  const { register, handleSubmit, errors, getValues } = useForm();

  const dispatch = useDispatch();

  const addUser = (userData) => {
    dispatch(registerUser(userData));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Form className='signup-form' onSubmit={handleSubmit(addUser)}>
      <div className='form__sign'>
        <h2>Sign Up</h2>
        <hr />
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <span className='fa fa-user' />
              </span>
            </div>
            <Form.Control
              type='text'
              name='username'
              placeholder='Username'
              ref={register({ required: 'Username is required.' })}
            />
            <ErrorMessage errors={errors} name='username' as='p' />
          </div>
        </div>
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fa fa-paper-plane'></i>
              </span>
            </div>
            <Form.Control
              type='email'
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
              //   type='password'
              name='password'
              placeholder='Password'
              ref={register({ required: 'Password is required.' })}
            />
            <ErrorMessage errors={errors} name='password' as='p' />
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
              //   type='password'
              name='passwordConfirmation'
              placeholder='Confirm Password'
              ref={register({
                required: 'Please confirm password!',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'Passwords should match!';
                  },
                },
              })}
            />
            <ErrorMessage errors={errors} name='passwordConfirmation' as='p' />
          </div>
        </div>

        <div className='form-group'>
          <Button type='submit' className='btn btn-primary btn-lg'>
            Sign Up
          </Button>
        </div>
      </div>
      <div className='text-center'>
        Already have an account?
        <NavLink exact to='/login'>
          Login here
        </NavLink>
      </div>
    </Form>
  );
};

export default Signup;
