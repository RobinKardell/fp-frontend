import React from 'react';
import { Select } from '@chakra-ui/react';

const AlfabethSelectBox = ({ field, ...rest }) => {
  const { name, value, onChange } = field;

  const options = [];

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    options.push(
      <option key={i} value={letter}>
        {letter}
      </option>
    );
  }

  return (
    <Select {...rest} {...field} value={value} onChange={onChange}>
      {options}
    </Select>
  );
};

export default AlfabethSelectBox;
