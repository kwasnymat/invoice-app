import React, { useState } from 'react';

import { Form, Button, Col } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';

import VatPrice from './VatPrice';
import NoVatPrice from './NoVatPrice';

import './CreateInvoice.scss';

const Invoices = () => {
  const { register, control, handleSubmit, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);

  const currencies = ['$', '€', 'zł'];

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 4));
  };
  const items = watch('items');
  console.log(items);

  const calcGrantTotal = () => {
    let sum = (a) => a.reduce((x, y) => x + y);
    let sumAmount = sum(items.map((x) => Number(x.totalMoney)));
    return sumAmount.toFixed(2);
  };

  const calcSubTotal = () => {
    let sum = (a) => a.reduce((x, y) => x + y);
    let sumAmount = sum(items.map((x) => Number(x.priceNoVat)));
    return sumAmount.toFixed(2);
  };

  const calcTaxTotal = () => {
    let sum = (a) => a.reduce((x, y) => x + y);
    let sumGrandTotal = sum(items.map((x) => Number(x.totalMoney)));
    let sumSubTotal = sum(items.map((x) => Number(x.priceNoVat)));
    return (sumGrandTotal - sumSubTotal).toFixed(2);
  };

  return (
    <Form className='form__invoice' onSubmit={handleSubmit(onSubmit)}>
      <h2>Invoice </h2>
      {/* pierwsza */}
      <div className='row' size='sm'>
        <div className=' col-lg-6'>
          <Form.Row>
            <Col xs={5}>
              <Form.Label>Invoice number</Form.Label>
              <Form.Control
                name='invoiceNumber'
                placeholder='#'
                size='sm'
                ref={register}
              />
            </Col>
          </Form.Row>
        </div>
        <div className='col-lg-6'>
          <Form.Row>
            <Col xs={4}>
              <Form.Label>Date Of Invoice</Form.Label>
              <Form.Control
                name='dateInvoice'
                type='date'
                size='sm'
                ref={register}
              />
            </Col>
            <Col xs={4}>
              <Form.Label>City</Form.Label>
              <Form.Control size='sm' name='cityInvoice' ref={register} />
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
              <Form.Control size='sm' ref={register} name='SellerCompanyName' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='SellerCompanyStreet'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='SellerCompanyZip'
              />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='SellerCompanyCity'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='SellerCompanyVat'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='SellerCompanyPhone'
              />
            </Col>
          </Form.Row>
        </div>
        <div className=' col-lg-6'>
          <Form.Label className='invoice__label'>Buyer</Form.Label>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyname'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyStreet'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyZip'
              />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyCity'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyVat'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyerCompanyPhone'
              />
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
                <th className='text-center'> Product name</th>
                <th className='text-center'> Unit Cost</th>
                <th className='text-center'> Qty </th>
                <th className='text-center'> Price excluding VAT</th>
                <th className='text-center'> VAT %</th>
                <th className='text-center'> Price including VAT </th>
              </tr>
            </thead>

            {fields.map(
              (
                {
                  productName,
                  unitCost,
                  qty = 1,
                  priceNoVat,
                  vat = 23,
                  totalMoney,
                },
                index
              ) => {
                return (
                  <tbody key={index}>
                    <tr id='addr0'>
                      <td>{index + 1}</td>
                      <td>
                        <Form.Control
                          ref={register()}
                          name={`items[${index}].productName`}
                          defaultValue={productName}
                          type='text'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Form.Control
                          ref={register()}
                          name={`items[${index}].unitCost`}
                          defaultValue={unitCost}
                          type='text'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Form.Control
                          ref={register()}
                          name={`items[${index}].qty`}
                          defaultValue={qty}
                          type='number'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <NoVatPrice
                          index={index}
                          register={register}
                          control={control}
                          defaultValue={priceNoVat}
                          type='number'
                          step='0.00'
                          min='0'
                          className='form-control'
                        />
                      </td>

                      <td>
                        <Form.Control
                          ref={register()}
                          name={`items[${index}].vat`}
                          defaultValue={vat}
                          type='number'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <VatPrice
                          defaultValue={totalMoney}
                          register={register}
                          control={control}
                          index={index}
                        />
                      </td>
                      <td
                        className='delete__button'
                        onClick={() => remove(index)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            )}
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6 col-md-8'>
          <div className='row'>
            <div className='col-xs-6 col-md-8'>
              <Button onClick={() => append({})}>
                <i className='fas fa-plus-circle'> Add item </i>
              </Button>
            </div>
            <div className='col-xs-6 col-md-4'>
              <Col xs={8}>
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  name='currency'
                  ref={register}
                  as='select'
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>
          </div>
        </div>
        <div className='col-xs-6 col-md-4'>
          <table
            className='table table-bordered table-hover'
            id='tab_logic_total'
          >
            <tbody>
              <tr>
                <th className='text-center'>Sub Total</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcSubTotal()}
                    type='number'
                    name='sub_total'
                    placeholder='0.00'
                    className='form-control'
                    id='sub_total'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>

              <tr>
                <th className='text-center'>Tax Amount</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcTaxTotal()}
                    type='number'
                    name='tax_amountTotal'
                    id='tax_amount'
                    placeholder='0.00'
                    className='form-control'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>
              <tr>
                <th className='text-center'>Grand Total</th>
                <td className='text-center'>
                  <Form.Control
                    ref={register}
                    readOnly
                    value={items && calcGrantTotal()}
                    type='number'
                    name='total_amount'
                    id='total_amount'
                    placeholder='0.00'
                    className='form-control'
                  />
                </td>
                <th className='text-center'>{currency}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6 col-md-10'></div>
        <div className='col-md-2'>
          <Button className='invoice__save' type='submit'>
            <i className='fas fa-save'> Save Invoice </i>
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Invoices;
