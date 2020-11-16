import React, { useEffect } from 'react';

import { Form, Button, Navbar, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import { editUser, editCompany } from '../auth/store/actions';
import Loader from '../layout/loader/Loader';

import './User.scss';

const User = () => {
  const { isLoading } = useSelector(({ shared }) => shared);
  const { user } = useSelector(({ auth }) => auth);
  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      user,
    },
  });
  const dispatch = useDispatch();

  const onSubmitUser = (data) => {
    dispatch(editUser(data));
  };
  const onSubmitCompany = (data) => {
    dispatch(editCompany(data));
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return isLoading ? (
    <Loader />
  ) : (
    <div class='row'>
      <div class='col-xs-4 col-md-5'>
        <Form className=' add__company' onSubmit={handleSubmit(onSubmitUser)}>
          <Navbar className='company_nav'>Edit your account details</Navbar>
          <Form.Row style={{ marginTop: 2 + 'rem' }}>
            <Col xs={8}>
              <Form.Label>User name</Form.Label>
              <Form.Control
                size='sm'
                name='username'
                ref={register({ required: 'Username is required.' })}
              />
              <ErrorMessage errors={errors} name='username' as='p' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Email adress</Form.Label>
              <Form.Control
                size='sm'
                name='email'
                ref={register({ required: 'Email adress is required.' })}
              />
              <ErrorMessage errors={errors} name='email' as='p' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Current password</Form.Label>
              <Form.Control
                size='sm'
                name='currentPassword'
                ref={register}
                type='password'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>New password</Form.Label>
              <Form.Control
                size='sm'
                name='password'
                ref={register}
                type='password'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Button className='invoice__save user_save' type='submit'>
              <i className='fas fa-save'> Save </i>
            </Button>
          </Form.Row>
        </Form>
      </div>
      <div class='col-xs-4 col-md-2 add__companyOr'> or.. </div>
      <div class='col-xs-4 col-md-5'>
        <Form
          className=' add__company'
          onSubmit={handleSubmit(onSubmitCompany)}
        >
          <Navbar className='company_nav'>
            Complete the form with you company details to create invoices
            faster!
          </Navbar>
          <Form.Row style={{ marginTop: 2 + 'rem' }}>
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
      </div>
    </div>
  );
};

export default User;
