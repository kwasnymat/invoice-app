import React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { Form, Button, Col } from 'react-bootstrap';

import { CalcGrantTotal, CalcSubTotal, CalcTaxTotal } from './Calc';
import NoVatPrice from './NoVatPrice';
import VatPrice from './VatPrice';

import './CreateInvoiceForm.scss';

const CreateInvoiceForm = ({
  watch,
  setValue,
  onSubmit,
  currency,
  register,
  setCurrency,
  currencies,
  items,
  fields,
  append,
  remove,
  handleSubmit,
  control,
  errors,
}) => {
  return (
    <Form className='form__invoice' onSubmit={handleSubmit(onSubmit)}>
      <h2>Invoice </h2>
      <div className='row' size='sm'>
        <div className=' col-lg-6'>
          <Form.Row>
            <Col xs={5}>
              <Form.Label>Invoice number</Form.Label>
              <Form.Control
                name='invoiceNumber'
                placeholder='#'
                size='sm'
                ref={register({
                  required: 'Invoice number is required.',
                  maxLength: {
                    value: 12,
                    message: 'Max length exceeded- 12 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='invoiceNumber' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
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
                ref={register({ required: 'Date of Invoice is required.' })}
              />
              <ErrorMessage errors={errors} name='dateInvoice' as='p' />
            </Col>
            <Col xs={4}>
              <Form.Label>City</Form.Label>
              <Form.Control
                size='sm'
                name='cityInvoice'
                ref={register({
                  required: 'Invoice city is required.',
                  maxLength: {
                    value: 14,
                    message: 'Max length exceeded- 14 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='cityInvoice' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
      </div>
      <hr />
      <div className='row '>
        <div className=' col-lg-6 '>
          <Form.Label className='invoice__label'>Seller</Form.Label>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                size='sm'
                name='SellerCompanyName'
                ref={register({
                  required: 'Seller name is required.',
                  maxLength: {
                    value: 60,
                    message: 'Max length exceeded- 60 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyName' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyStreet'
                ref={register({
                  required: 'Seller street is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyStreet' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyZip'
                ref={register({
                  required: 'Seller zip-code is required.',
                  maxLength: {
                    value: 10,
                    message: 'Max length exceeded- 10 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyZip' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyCity'
                ref={register({
                  required: 'Seller  city is required.',
                  maxLength: {
                    value: 20,
                    message: 'Max length exceeded- 20 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyCity' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='SellerCompanyVat'
                ref={register({
                  required: 'Seller vat number is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyVat' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='number'
                size='sm'
                name='SellerCompanyPhone'
                ref={register({
                  required: 'Seller phone number is required.',
                  maxLength: {
                    value: 16,
                    message: 'Max length exceeded- 16 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='SellerCompanyPhone' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
        <div className=' col-lg-6'>
          <Form.Label className='invoice__label'>Buyer</Form.Label>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                size='sm'
                name='BuyerCompanyName'
                ref={register({
                  required: 'Buyer name is required.',
                  maxLength: {
                    value: 60,
                    message: 'Max length exceeded- 60 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyName' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyStreet'
                ref={register({
                  required: 'Buyer street is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyStreet' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={3}>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyZip'
                ref={register({
                  required: 'Buyer zip-code is required.',
                  maxLength: {
                    value: 10,
                    message: 'Max length exceeded- 10 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyZip' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyCity'
                ref={register({
                  required: 'Buyer city is required.',
                  maxLength: {
                    value: 20,
                    message: 'Max length exceeded- 20 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyCity' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Vat Id</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyVat'
                ref={register({
                  required: 'Buyer vat number is required.',
                  maxLength: {
                    value: 30,
                    message: 'Max length exceeded- 30 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyVat' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                name='BuyerCompanyPhone'
                ref={register({
                  required: 'Buyer phone number is required.',
                  maxLength: {
                    value: 16,
                    message: 'Max length exceeded- 16 characters.',
                  },
                })}
              />
              <ErrorMessage errors={errors} name='BuyerCompanyPhone' as='p'>
                {({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                  ))
                }
              </ErrorMessage>
            </Col>
          </Form.Row>
        </div>
      </div>
      <hr />
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
                          name={`items[${index}].productName`}
                          defaultValue={productName}
                          type='text'
                          className='form-control'
                          ref={register({
                            required: 'Product name is required.',
                            maxLength: {
                              value: 20,
                              message: 'Max length exceeded- 20 characters.',
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].productName`}
                          as='p'
                        >
                          {({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type}>{message}</p>
                            ))
                          }
                        </ErrorMessage>
                      </td>
                      <td>
                        <Form.Control
                          type='number'
                          name={`items[${index}].unitCost`}
                          defaultValue={unitCost}
                          className='form-control'
                          ref={register({
                            required: 'Unit cost is required.',
                            min: {
                              value: 1,
                              message: 'Min value is 1.',
                            },
                            max: {
                              value: 99999999,
                              message: 'Max value exceeded- 99999999.',
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].unitCost`}
                          as='p'
                        >
                          {({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type}>{message}</p>
                            ))
                          }
                        </ErrorMessage>
                      </td>
                      <td>
                        <Form.Control
                          name={`items[${index}].qty`}
                          defaultValue={qty}
                          type='number'
                          className='form-control'
                          ref={register({
                            required: 'Quantity is required.',
                            min: {
                              value: 1,
                              message: 'Min value is 1.',
                            },
                            max: {
                              value: 99999999,
                              message: 'Max value exceeded- 99999999.',
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].qty`}
                          as='p'
                        >
                          {({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type}>{message}</p>
                            ))
                          }
                        </ErrorMessage>
                      </td>
                      <td>
                        <NoVatPrice
                          setValue={setValue}
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
                          name={`items[${index}].vat`}
                          defaultValue={vat}
                          type='number'
                          className='form-control'
                          ref={register({
                            required: 'Vat % is required.',
                            max: {
                              value: 99,
                              message: 'Max value exceeded- 99%.',
                            },
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name={`items[${index}].vat`}
                          as='p'
                        >
                          {({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                              <p key={type}>{message}</p>
                            ))
                          }
                        </ErrorMessage>
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
          {items && <CalcGrantTotal setValue={setValue} watch={watch} />}
          {items && <CalcSubTotal setValue={setValue} watch={watch} />}
          {items && <CalcTaxTotal setValue={setValue} watch={watch} />}
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
            <div className='col-xs-6 col-md-4 '>
              <Col xs={8} className='choose__curency'>
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
export default CreateInvoiceForm;
