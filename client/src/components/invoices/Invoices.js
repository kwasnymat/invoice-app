import React, { useState } from 'react';

import { Form, Button, Col } from 'react-bootstrap';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';

const Price = ({ control, index, rego, elo, onChange }) => {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  return (
    <Form.Control
      onChange={(e) => onChange(e, index)}
      readOnly
      defaultValue={elo}
      ref={rego()}
      name={`items[${index}].totalMoney`}
      value={(
        (value.qty || 0) * (value.priceNoVat || 0) +
        ((value.qty * value.priceNoVat) / 100) * value.vat
      ).toFixed(2)}
    />
  );
};

const PriceTotal = ({ control, index }) => {
  const valueHej = useWatch({
    control,
    name: `items.totalMoney`,
    defaultValue: {},
  });
  console.log(valueHej);
  return null;
};

const Invoices = () => {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);
  //   console.log(watch('total_amount'));
  const currencies = ['$', '€', 'zł'];

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 4));
  };

  const [formList, setFormList] = useState([
    {
      totalMoney: '',
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formList];
    // console.log(list);
    list[index][name] = value;

    console.log(list);
    setFormList(list);
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
                <th className='text-center'> Qty </th>
                <th className='text-center'> Price excluding VAT</th>
                <th className='text-center'> VAT %</th>
                <th className='text-center'> Price including VAT </th>
              </tr>
            </thead>

            {fields.map(
              ({ id, productName, qty, priceNoVat, vat, money }, index) => {
                return (
                  <tbody key={id}>
                    <tr id='addr0'>
                      <td></td>
                      <td>
                        <Form.Control
                          // onChange={(e) => handleInputChange(e, index)}
                          //   name={`tickets[${i}]name`}
                          ref={register()}
                          name={`items[${index}].productName`}
                          defaultValue={productName}
                          //   value={x.productName}
                          // onChange={(e) => handleInputChange(e, i)}
                          type='text'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Form.Control
                          // onChange={(e) => handleInputChange(e, index)}
                          ref={register()}
                          name={`items[${index}].qty`}
                          defaultValue={qty}
                          //   value={x.qty}
                          // onChange={(e) => {
                          //   handleInputChange(e, i);
                          //   //   setinvoiceNr(e.target.value);
                          // }}
                          type='number'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Form.Control
                          // onChange={(e) => handleInputChange(e, index)}
                          ref={register()}
                          name={`items[${index}].priceNoVat`}
                          defaultValue={priceNoVat}
                          //   value={x.priceNoVat}
                          // onChange={(e) => handleInputChange(e, i)}
                          type='number'
                          step='0.00'
                          min='0'
                          //   onChange={setValue(
                          //     `priveWithVat[${i}]`,
                          //     `${productName[i].value + qty[i].value}`
                          //   )}
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Form.Control
                          // onChange={(e) => handleInputChange(e, index)}
                          ref={register()}
                          name={`items[${index}].vat`}
                          defaultValue={vat}
                          //   value={x.vat}
                          // onChange={
                          //   ((e) => handleInputChange(e, i),
                          //   setValue(
                          //     'priceWithVat',
                          //     `${(
                          //       x.qty * x.priceNoVat +
                          //       ((x.qty * x.priceNoVat) / 100) * x.vat
                          //     ).toFixed(2)}`
                          //   ))
                          // }
                          type='number'
                          className='form-control'
                        />
                      </td>
                      <td>
                        <Price
                          onChange={handleInputChange}
                          elo={money}
                          rego={register}
                          control={control}
                          index={index}
                        />
                        {/* <Form.Control
                        // onChange={(e) => handleInputChange(e, index)}
                        ref={register()}
                        name={`items[${index}].priveWithVat`}
                        defaultValue={name}
                        // onChange={(e) => handleInputChange(e, i)}

                        className='form-control'
                      /> */}
                      </td>

                      <td
                        className='delete__button'
                        onClick={() => remove(index)}
                        //   onClick={removeFriend(index)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </td>
                    </tr>
                    <PriceTotal index={index} control={control} />
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
              <Button
                onClick={() => append({})}
                //   onClick={addFriend}
              >
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
                    // value={calcSubTotal()}
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
                    // value={calcSTaxTotal()}
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
                    // value={calcGrandTotal()}
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
