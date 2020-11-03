import React from 'react';
import { NavLink } from 'react-router-dom';

import './Login.scss';

const Login = () => {
  return (
    <div className='signup-form'>
      <form>
        <h2>Member Login</h2>
        <hr />
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fa fa-paper-plane'></i>
              </span>
            </div>
            <input
              type='email'
              className='form-control'
              name='email'
              placeholder='Email Address'
              required='required'
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fa fa-lock'></i>
              </span>
            </div>
            <input
              type='text'
              className='form-control'
              name='password'
              placeholder='Password'
              required='required'
            />
          </div>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary btn-lg '>
            Sign Up
          </button>
        </div>
      </form>
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
  );
};
export default Login;
