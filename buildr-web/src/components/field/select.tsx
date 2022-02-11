import React from 'react';
import { Center, CircularProgress, FormControl, FormLabel } from '@chakra-ui/react';

// components
import Select from '../select';

interface Props {
  label: string;
  options?: SelectOption[];
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
      <Select options={options} isLoading={isLoading} value={value} onChange={onChange} />
    )}
  </FormControl>
);

export default SelectField;
