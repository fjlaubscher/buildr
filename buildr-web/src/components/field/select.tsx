import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface SelectOption {
  id: number;
  description: string;
}

interface Props {
  label: string;
  options: SelectOption[];
  isRequired?: boolean;
  onChange: (value: string) => void;
  value: number;
  mb?: string;
}

const SelectField = ({ label, value, options, isRequired, onChange, mb }: Props) => (
  <FormControl mb={mb || '2'} isRequired={isRequired || false}>
    <FormLabel>{label}</FormLabel>
    <Select
      placeholder="Select an option"
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    >
      {options.map((o, i) => (
        <option key={`option-${i}`} value={o.id}>
          {o.description}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
