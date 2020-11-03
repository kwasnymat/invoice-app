import React, { useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import CreateInvoiceForm from './CreateInvoiceForm';

import { addInvoice } from '../store/actions';

const Invoices = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    errors,
    setValue,
    useWatch,
  } = useForm();
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

  return (
    <CreateInvoiceForm
      useWatch={useWatch}
      watch={watch}
      setValue={setValue}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      remove={remove}
      append={append}
      fields={fields}
      onSubmit={onSubmit}
      currency={currency}
      register={register}
      setCurrency={setCurrency}
      currencies={currencies}
      items={items}
    />
  );
};

export default Invoices;
