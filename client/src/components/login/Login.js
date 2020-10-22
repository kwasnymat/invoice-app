import React from 'react';
import { NavLink } from 'react-router-dom';

import './Login.scss';

const Login = () => {
  return (
    <div class='signup-form'>
      <form>
        <h2>Member Login</h2>
        <hr />
        <div class='form-group'>
          <div class='input-group'>
            <div class='input-group-prepend'>
              <span class='input-group-text'>
                <i class='fa fa-paper-plane'></i>
              </span>
            </div>
            <input
              type='email'
              class='form-control'
              name='email'
              placeholder='Email Address'
              required='required'
            />
          </div>
        </div>
        <div class='form-group'>
          <div class='input-group'>
            <div class='input-group-prepend'>
              <span class='input-group-text'>
                <i class='fa fa-lock'></i>
              </span>
            </div>
            <input
              type='text'
              class='form-control'
              name='password'
              placeholder='Password'
              required='required'
            />
          </div>
        </div>
        <div class='form-group'>
          <button type='submit' class='btn btn-primary btn-lg '>
            Sign Up
          </button>
        </div>
      </form>
      <div class='text-center'>
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
