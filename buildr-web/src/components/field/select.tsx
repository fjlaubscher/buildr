import React from 'react';
import { Center, CircularProgress, FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props {
  label: string;
  options: SelectOption[];
  isRequired?: boolean;
  isLoading?: boolean;
  onChange: (value: number) => void;
  value: number;
  mb?: string;
}

const SelectField = ({ label, value, options, isRequired, isLoading, onChange, mb }: Props) => (
  <FormControl mb={mb || '2'} isRequired={isRequired || false}>
    <FormLabel>{label}</FormLabel>
    {isLoading ? (
      <Center width="100%">
        <CircularProgress isIndeterminate />
      </Center>
    ) : (
      <Select
        placeholder="Select an option"
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.currentTarget.value));
        }}
      >
        {options.map((o, i) => (
          <option key={`option-${i}`} value={o.id}>
            {o.description}
          </option>
        ))}
      </Select>
    )}
  </FormControl>
);

export default SelectField;
