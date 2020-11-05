import React from 'react';

import './Signup.scss';

import { NavLink } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='signup-form'>
      <form>
        <h2>Sign Up</h2>
        <hr />
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <span className='fa fa-user' />
              </span>
            </div>
            <input
              type='text'
              className='form-control'
              name='username'
              placeholder='Username'
              required='required'
            />
          </div>
        </div>
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
          <button type='submit' className='btn btn-primary btn-lg'>
            Sign Up
          </button>
        </div>
      </form>
      <div className='text-center'>
        Already have an account?
        <NavLink exact to='/login'>
          Login here
        </NavLink>
      </div>
    </div>
  );
};

export default Signup;
