import React, { useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import CreateInvoiceForm from './CreateInvoiceForm';

import { addInvoice } from '../store/actions';

const Invoices = () => {
  const { register, control, handleSubmit, watch, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const dispatch = useDispatch();

  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);

  const currencies = ['$', '€', 'zł'];

  const onSubmit = (invoice) => {
    dispatch(addInvoice(invoice));
  };
  const items = watch('items');

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
    <CreateInvoiceForm
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      remove={remove}
      append={append}
      fields={fields}
      onSubmit={onSubmit}
      currency={currency}
      calcGrantTotal={calcGrantTotal}
      calcSubTotal={calcSubTotal}
      calcTaxTotal={calcTaxTotal}
      register={register}
      setCurrency={setCurrency}
      currencies={currencies}
      items={items}
    />
  );
};

export default Invoices;
