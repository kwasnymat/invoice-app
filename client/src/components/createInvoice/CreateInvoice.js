import React, { useState, useEffect } from 'react';

import { Form, Button, Col, Table } from 'react-bootstrap';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';

import './CreateInvoice.scss';
let renderCount = 0;
let count = 1;
const Invoices = () => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [vat, setVat] = useState(23);

  const onChangeQty = (e) => {
    setQty(parseInt(e.target.value));
  };
  const onChangePrice = (e) => {
    setPrice(parseInt(e.target.value));
  };
  const onChangeVat = (e) => {
    setVat(parseInt(e.target.value));
  };

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      product: [{ id: '', qty: '', price: '', var: '', totalPrice: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product',
  });

  const onSubmit = (data) => console.log('data', data);
  renderCount++;
  count++;
  return (
    <Form className='form__invoice'>
      <h2>Invoice </h2>
      {/* pierwsza */}
      <div className='row' style={{ marginBottom: 3 + 'rem' }} size='sm'>
        <div className=' col-lg-6'>
          <Form.Row>
            <Col xs={5}>
              <Form.Label>Invoice number</Form.Label>
              <Form.Control type='name' placeholder='#' size='sm' />
            </Col>
          </Form.Row>
        </div>
        <div className='col-lg-6'>
          <Form.Row>
            <Col xs={4}>
              <Form.Label>Date Of Invoice</Form.Label>
              <Form.Control name='invoice date' type='date' size='sm' />
            </Col>
            <Col xs={4}>
              <Form.Label>City</Form.Label>
              <Form.Control size='sm' />
            </Col>
          </Form.Row>
        </div>
      </div>
      {/* druga */}
      <hr />
      <div className='row '>
        <div className=' col-lg-6 '>
          <Form.Label className='invoice__label'>Seller</Form.Label>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
        </div>
        <div className=' col-lg-6'>
          <Form.Label className='invoice__label'>Buyer</Form.Label>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control type='name' size='sm' />
            </Col>
          </Form.Row>
        </div>
      </div>

      <hr />
      {/* trzecia */}
      <div className='row'>
        <div className='col-lg-12'>
          <table className='table table-bordered table-hover' id='tab_logic'>
            <thead>
              <tr>
                <th className='text-center'> # </th>
                <th className='text-center'> Product </th>
                <th className='text-center'> Qty </th>
                <th className='text-center'> Price excluding VAT</th>
                <th className='text-center'> VAT %</th>
                <th className='text-center'> Price including VAT </th>
              </tr>
            </thead>

            {fields.map((item, index) => {
              return (
                <tbody key={item.id}>
                  <tr id='addr0'>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        control={control}
                        ref={register()}
                        type='text'
                        name={index}
                        placeholder='Enter Product Name'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <Form.Control
                        control={control}
                        onChange={onChangeQty}
                        name={index}
                        type='number'
                        name='qty[]'
                        placeholder='Enter Qty'
                        className='form-control qty'
                        step='0'
                        min='0'
                      />
                    </td>
                    <td>
                      <Form.Control
                        control={control}
                        onChange={onChangePrice}
                        name={index}
                        type='number'
                        placeholder='Enter Unit Price'
                        className='form-control price'
                        step='0.00'
                        min='0'
                      />
                    </td>
                    <td>
                      <Form.Control
                        control={control}
                        onChange={onChangeVat}
                        name={index}
                        type='number'
                        placeholder='0.00'
                        className='form-control total'
                        defaultValue={vat}
                      />
                    </td>
                    <td>
                      <Form.Control
                        control={control}
                        type='number'
                        name={index}
                        className='form-control price'
                        step='0.00'
                        min='0'
                        disabled
                        value={qty * price + ((qty * price) / 100) * vat}
                      />
                    </td>

                    <td
                      className='delete__button'
                      onClick={() => remove(index)}
                    >
                      <i className='fas fa-trash-alt'></i>
                    </td>
                  </tr>
                  <tr id='addr1'></tr>
                </tbody>
              );
            })}
          </table>
          {/* </Form.Row> */}
          <section>
            <Button onClick={append}>
              <i className='fas fa-plus-circle'>Add item</i>
            </Button>
            <Button
              onClick={() =>
                reset({
                  test: [{ firstName: 'Bill', lastName: 'Luo' }],
                })
              }
            >
              <i className='fas fa-trash-alt'>reset</i>
            </Button>
          </section>
        </div>
      </div>
      {/* czwarta */}

      <div className='row' style={{ marginTop: 1 + 'rem' }}>
        <div className='col-lg-6'></div>

        <div className='col-lg-6'>
          <div className='row clearfix' style={{ marginTop: 20 + 'px' }}>
            <div className='pull-right col-md-4'>
              <table
                className='table table-bordered table-hover'
                id='tab_logic_total'
              >
                <tbody>
                  <tr>
                    <th className='text-center'>Sub Total</th>
                    <td className='text-center'>
                      <input
                        type='number'
                        name='sub_total'
                        placeholder='0.00'
                        className='form-control'
                        id='sub_total'
                      />
                    </td>
                  </tr>

                  <tr>
                    <th className='text-center'>Tax Amount</th>
                    <td className='text-center'>
                      <input
                        type='number'
                        name='tax_amount'
                        id='tax_amount'
                        placeholder='0.00'
                        className='form-control'
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className='text-center'>Grand Total</th>
                    <td className='text-center'>
                      <input
                        type='number'
                        name='total_amount'
                        id='total_amount'
                        placeholder='0.00'
                        className='form-control'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Invoices;
