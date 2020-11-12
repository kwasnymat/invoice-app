import React from 'react';

import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Home.scss';

const Home = () => {
  const { isAuth } = useSelector(({ auth }) => auth);

  //   const history = useHistory();

  return (
    <div className='Home'>
      <Container>
        <div className='homePage'>
          <div className='col-md-6'>
            <h1 className='pb-2'>
              <strong>Welcome to invoiceApp </strong>{' '}
            </h1>
            <h3>Create custom, professional invoices in a few easy steps.</h3>
            {!isAuth ? (
              <>
                <h5>Please login or sign up to starting creating!</h5>
                <NavLink exact to='/login'>
                  <Button
                    type='submit'
                    className='btn btn-primary btn-lg redirect'
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink exact to='/sign-up'>
                  <Button
                    type='submit'
                    className='btn btn-primary btn-lg redirect'
                  >
                    Sign up
                  </Button>
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
