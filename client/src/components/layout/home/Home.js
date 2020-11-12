import React from 'react';

import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Home.scss';

const Home = () => {
  const { isAuth } = useSelector(({ auth }) => auth);

  const history = useHistory();

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
                <Button
                  type='submit'
                  className='btn btn-primary btn-lg redirect'
                  onClick={() => history.push(`/login`)}
                >
                  Login
                </Button>
                <Button
                  type='submit'
                  className='btn btn-primary btn-lg redirect'
                  onClick={() => history.push(`/sign-up`)}
                >
                  Sign up
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
