import React from 'react';

import { useWatch } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const NoVatPrice = ({ control, index, register, defaultValue, setValue }) => {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: defaultValue,
  });

  return (
    <Form.Control
      className='form-control dynamic__fields'
      type='number'
      readOnly
      ref={register}
      name={`items[${index}].priceNoVat`}
      value={value && ((value.qty || 0) * (value.unitCost || 0)).toFixed(2)}
    />
  );
};

export default NoVatPrice;
