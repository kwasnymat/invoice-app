import React from 'react';

import { useWatch } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const SubPrice = ({ control, index, register, defaultValue, onChange }) => {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  return (
    <Form.Control
      defaultValue={defaultValue}
      ref={register()}
      name={`items[${index}].totalMoney`}
      value={(
        (value.qty || 0) * (value.unitCost || 0) +
        (((value.qty || 0) * (value.unitCost || 0)) / 100) * (value.vat || 0)
      ).toFixed(2)}
    />
  );
};

export default SubPrice;
