import React from 'react';
import { CircularProgress, Select as ChakraSelect } from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

interface Props {
  value: number;
  onChange: (value: number) => void;
  options?: SelectOption[];
  isLoading?: boolean;
  mb?: number;
}

const Select = ({ options, value, onChange, isLoading, mb }: Props) => (
  <ChakraSelect
    placeholder="Select an option"
    value={value}
    onChange={(e) => {
      onChange(parseInt(e.currentTarget.value));
    }}
    icon={isLoading ? <CircularProgress size="1rem" isIndeterminate /> : <MdArrowDropDown />}
    mb={mb}
  >
    {options &&
      options.map((o, i) => (
        <option key={`option-${i}`} value={o.id}>
          {o.description}
        </option>
      ))}
  </ChakraSelect>
);

export default Select;
