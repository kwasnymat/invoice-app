import React from 'react';

import './Signup.scss';

import { NavLink } from 'react-router-dom';

const Signup = () => {
  return (
    <div class='signup-form'>
      <form>
        <h2>Sign Up</h2>
        <p>Please fill the form to create an account!</p>
        <hr />
        <div class='form-group'>
          <div class='input-group'>
            <div class='input-group-prepend'>
              <span class='input-group-text'>
                <span class='fa fa-user' />
              </span>
            </div>
            <input
              type='text'
              class='form-control'
              name='username'
              placeholder='Username'
              required='required'
            />
          </div>
        </div>
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
          <button type='submit' class='btn btn-primary btn-lg'>
            Sign Up
          </button>
        </div>
      </form>
      <div class='text-center'>
        Already have an account?
        <NavLink exact to='/login'>
          Login here
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
