import React, { useState } from 'react';

import { Form, Button, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import './CreateInvoice.scss';

const Invoices = () => {
  const [formList, setFormList] = useState([
    {
      productName: '',
      qty: '',
      priceNoVat: '',
      vat: 23,
      priceWithVat: '',
    },
  ]);
  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);

  const currencies = ['$', '€', 'zł'];

  const [invoiceNr, setinvoiceNr] = useState('');
  const [dateInvoice, setldateInvoice] = useState('');

  const submitValue = (e) => {
    e.preventDefault();
    const frmdetails = {
      'Invoice numer': invoiceNr,
      'Date on Invoicee': dateInvoice,
    };
    console.log(frmdetails);
  };

  const { register } = useForm();
  //   const onSubmit = (data) => console.log(data);

  const handleInputChange = (e, index) => {
    console.log(e);
    console.log(index);
    const { name, value } = e.target;
    const list = [...formList];
    console.log(list);
    list[index][name] = value;
    // list[index][priceWithVat].value = (
    //   qty * priceNoVat +
    //   ((qty * priceNoVat) / 100) * vat
    // ).toFixed(2);
    console.log(list);
    setFormList(list);
  };

  const calcGrandTotal = () => {
    return formList
      .reduce(
        (prev, cur) =>
          prev +
          cur.qty * cur.priceNoVat +
          ((cur.qty * cur.priceNoVat) / 100) * cur.vat,
        0
      )
      .toFixed(2);
  };
  const calcSubTotal = () => {
    return formList
      .reduce((prev, cur) => prev + cur.qty * cur.priceNoVat, 0)
      .toFixed(2);
  };

  const calcSTaxTotal = () => {
    return (calcGrandTotal() - calcSubTotal()).toFixed(2);
  };

  const handleDeleteClick = (index) => {
    const list = [...formList];
    list.splice(index, 1);

    setFormList(list);
  };

  const handleAddClick = () => {
    setFormList([
      ...formList,
      { productName: '', qty: '', priceNoVat: '', vat: 23, priceWithVat: '' },
    ]);
  };

  return (
    <Form className='form__invoice' onSubmit={submitValue}>
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
                onChange={(e) => setldateInvoice(e.target.value)}
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
              <Form.Control size='sm' ref={register} name='companyName' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col xs={8}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='companyStreet'
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
                name='companyZip'
              />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='companyCity'
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
                name='companyVat'
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
                name='companyPhone'
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
                name='Buyercompanyname'
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
                name='BuyercompanyStreet'
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
                name='BuyercompanyZip'
              />
            </Col>
            <Col xs={5}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='name'
                size='sm'
                ref={register}
                name='BuyercompanyCity'
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
                name='BuyercompanyVat'
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
                name='BuyercompanyPhone'
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

            {formList.map((x, i) => {
              return (
                <tbody key={i}>
                  <tr id='addr0'>
                    <td>{i + 1}</td>
                    <td>
                      <Form.Control
                        ref={register}
                        name='productName'
                        value={x.productName}
                        onChange={(e) => handleInputChange(e, i)}
                        type='text'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <Form.Control
                        ref={register}
                        name='qty'
                        value={x.qty}
                        onChange={(e) => {
                          handleInputChange(e, i);
                          setinvoiceNr(e.target.value);
                        }}
                        type='number'
                        className='form-control '
                      />
                    </td>
                    <td>
                      <Form.Control
                        ref={register}
                        name='priceNoVat'
                        value={x.priceNoVat}
                        onChange={(e) => handleInputChange(e, i)}
                        type='number'
                        className='form-control '
                        step='0.00'
                        min='0'
                      />
                    </td>
                    <td>
                      <Form.Control
                        ref={register}
                        name='vat'
                        value={x.vat}
                        onChange={(e) => handleInputChange(e, i)}
                        type='number'
                        className='form-control '
                      />
                    </td>
                    <td>
                      <Form.Control
                        ref={register}
                        name='priceWithVat'
                        onChange={(e) => handleInputChange(e, i)}
                        value={(
                          x.qty * x.priceNoVat +
                          ((x.qty * x.priceNoVat) / 100) * x.vat
                        ).toFixed(2)}
                        type='number'
                        className='form-control vatto'
                        disabled
                      />
                    </td>
                    {formList.length !== 1 && (
                      <td
                        className='delete__button'
                        onClick={() => handleDeleteClick(i)}
                      >
                        <i className='fas fa-trash-alt'></i>
                      </td>
                    )}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6 col-md-8'>
          <div className='row'>
            <div className='col-xs-6 col-md-8'>
              <Button onClick={handleAddClick}>
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
                    disabled
                    value={calcSubTotal()}
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
                    disabled
                    value={calcSTaxTotal()}
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
                    disabled
                    value={calcGrandTotal()}
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
