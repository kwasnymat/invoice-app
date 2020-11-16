import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { fetchInvoices, saveQuery } from '../../invoices/store/actions';
import {
  createQueryString,
  createQueryStore,
} from '../../invoices/queryFuncs/queryFuncs';

import './FilterBar.scss';

const FilterBar = () => {
  const { allInvoices } = useSelector(({ invoices }) => invoices);
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();

  const SubmitForm = (values) => {
    const queryString = createQueryString(values);
    const queryStringStore = createQueryStore(values);
    dispatch(saveQuery(queryStringStore));
    dispatch(fetchInvoices(queryString));
  };

  const ResetForm = () => {
    dispatch(fetchInvoices());
    dispatch(saveQuery(''));
  };

  const uniqueInvoices = [
    ...new Map(
      allInvoices.map(
        (item) => (
          /*eslint no-sequences: */
          [item.dateInvoice, item], [item.BuyerCompanyName, item]
        )
      )
    ).values(),
  ];

  return (
    <Form onSubmit={handleSubmit(SubmitForm)}>
      <Navbar className='filter__bar custab' expand='lg'>
        <Form.Group className='filter__position'>
          <Form.Label>Invoice number</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            name='invoiceNumber'
            placeholder='type invoice number '
          />
        </Form.Group>
        <Form.Group className='filter__position'>
          <Form.Label>Invoicte date</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            as='select'
            name='dateInvoice'
          >
            <option>-------</option>
            {uniqueInvoices.map((inv) => (
              <option value={inv.dateInvoice} key={inv._id}>
                {inv.dateInvoice}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className='filter__position'>
          <Form.Label>Recipient name</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            as='select'
            name='BuyerCompanyName'
          >
            <option>-------</option>
            {uniqueInvoices.map((inv) => (
              <option value={inv.BuyerCompanyName} key={inv._id}>
                {inv.BuyerCompanyName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='secondary'>
          Filter <i className='fas fa-filter' />
        </Button>
        <Button
          type='reset'
          variant='secondary'
          onClick={ResetForm}
          className='button_resetFilter'
        >
          Reset <i className='fas fa-sync-alt' />
        </Button>
      </Navbar>
    </Form>
  );
};

export default FilterBar;
