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
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const defaultValues = {
    test: [
      {
        value: '0',
        nestedArray: [{ value: '0' }],
      },
      {
        value: '0',
        nestedArray: [{ value: '1' }],
      },
    ],
  };

  const dispatch = useDispatch();

  const selectedCurrency = '$';
  const [currency, setCurrency] = useState(selectedCurrency);

  const currencies = ['$', '€', 'zł'];

  const onSubmit = (invoice) => {
    dispatch(addInvoice(invoice));
  };
  const items = watch('items');

  //   const calcGrantTotal = () => {
  //     let sum = (a) => a.reduce((x, y) => x + y);
  //     let sumAmount = sum(items.map((x) => Number(x.totalMoney)));
  //     const outputGrantTotal = sumAmount.toFixed(2);
  //     setValue('total_amount', outputGrantTotal);
  //     // console.log(outputGrantTotal);

  //     return outputGrantTotal;
  //   };

  //   const calcSubTotal = () => {
  //     let sum = (a) => a.reduce((x, y) => x + y);
  //     let sumAmount = sum(items.map((x) => Number(x.priceNoVat)));
  //     const outputSubTotal = sumAmount.toFixed(2);
  //     setValue('sub_total', outputSubTotal);
  //     // console.log(outputSubTotal);

  //     return outputSubTotal;
  //   };

  //   const calcTaxTotal = () => {
  //     let sum = (a) => a.reduce((x, y) => x + y);
  //     let sumGrandTotal = sum(items.map((x) => Number(x.totalMoney)));
  //     let sumSubTotal = sum(items.map((x) => Number(x.priceNoVat)));
  //     const outputTaxTotal = (sumGrandTotal - sumSubTotal).toFixed(2);
  //     setValue('tax_amountTotal', outputTaxTotal);
  //     // console.log(outputTaxTotal);
  //     return null;
  //   };

  return (
    <CreateInvoiceForm
      defaultValues={defaultValues}
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
