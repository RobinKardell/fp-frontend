import React from 'react';
import { Select } from '@chakra-ui/react';

const NumberSelectBox = ({ field, ...rest }) => {
  const { name, value, onChange } = field;

  const options = [];

  for (let i = 1; i <= 40; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <Select {...rest} {...field} value={value} onChange={onChange}>
      {options}
    </Select>
  );
};

export default NumberSelectBox;
