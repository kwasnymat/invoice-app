import React, { useEffect } from 'react';

import { Form, Button, Navbar, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { editUser } from '../auth/store/actions';
import Loader from '../layout/loader/Loader';

import './User.scss';

const User = () => {
  const { isLoading } = useSelector(({ shared }) => shared);
  const { user } = useSelector(({ auth }) => auth);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      user,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(editUser(data));
    console.log(data);
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Form className=' add__company' onSubmit={handleSubmit(onSubmit)}>
        <Navbar className='company_nav'>
          Complete the form with you company details to create invoices faster!
        </Navbar>
        <Form.Row style={{ marginTop: 2 + 'rem' }}>
          <Col xs={8}>
            <Form.Label>User name</Form.Label>
            <Form.Control size='sm' name='username' ref={register} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={8}>
            <Form.Label>Email adress</Form.Label>
            <Form.Control size='sm' name='email' ref={register} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={8}>
            <Form.Label>Company name</Form.Label>
            <Form.Control size='sm' name='CompanyName' ref={register} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={8}>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type='name'
              size='sm'
              name='CompanyStreet'
              ref={register}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={3}>
            <Form.Label>Zip code</Form.Label>
            <Form.Control
              type='name'
              size='sm'
              name='CompanyZip'
              ref={register}
            />
          </Col>
          <Col xs={5}>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='name'
              size='sm'
              name='CompanyCity'
              ref={register}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={8}>
            <Form.Label>Vat Id</Form.Label>
            <Form.Control
              type='name'
              size='sm'
              name='CompanyVat'
              ref={register}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={8}>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type='number'
              size='sm'
              name='CompanyPhone'
              ref={register}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Button className='invoice__save user_save' type='submit'>
            <i className='fas fa-save'> Save </i>
          </Button>
        </Form.Row>
      </Form>
    </>
  );
};

export default User;
