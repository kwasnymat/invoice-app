import React from 'react';

import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './NotFound.scss';

const NotFound = () => {
  return (
    <div className='col-md-12 text-center notFound'>
      <span className='display-1 d-block'>404</span>
      <div className='mb-4 lead'>
        The page you are looking for was not found.
      </div>
      <NavLink className='btn btn-link' exact to='/'>
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
