import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Navbar, Form } from 'react-bootstrap';

import { fetchInvoices } from '../../invoices/store/actions';

import './FilterBar.scss';

const FilterBar = ({ dataInvoices }) => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const SubmitForm = (values) => {
    const queryString = createQueryString(values);
    console.log(values);
    console.log(queryString);
  };
  const ResetForm = () => {
    dispatch(fetchInvoices());
  };
  const createQueryString = (values) => {
    const filteredValues = Object.entries(values).filter(
      ([, value]) => value !== 'Filter all'
    );
    const url = new URLSearchParams(filteredValues).toString();
    return url && `?${url}`;
  };
  return (
    <Form onSubmit={handleSubmit(SubmitForm)}>
      <Navbar className='filter__bar custab' expand='lg'>
        <Form.Group>
          <Form.Label>Invoice number</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            as='select'
            name='invoiceNumber'
          >
            <option>-------</option>
            {dataInvoices.map((inv) => (
              <option value={inv.invoiceNumber} key={inv._id}>
                {inv.invoiceNumber}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Invoicte date</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            as='select'
            name='invoiceDate'
          >
            <option>-------</option>
            {dataInvoices.map((inv) => (
              <option value={inv.BuyerCompanyVat} key={inv._id}>
                {inv.BuyerCompanyVat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipient name</Form.Label>
          <Form.Control
            ref={register}
            className='form__control'
            as='select'
            name='dateInvoice'
          >
            <option>-------</option>
            {dataInvoices.map((inv) => (
              <option value={inv.dateInvoice} key={inv._id}>
                {inv.dateInvoice}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type='submit'>
          Filter <i class='fas fa-filter' />
        </Button>
        <Button type='reset' variant='secondary' onClick={ResetForm}>
          Reset <i class='fas fa-sync-alt' />
        </Button>
      </Navbar>
    </Form>
  );
};

export default FilterBar;
