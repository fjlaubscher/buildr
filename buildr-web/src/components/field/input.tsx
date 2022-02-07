import React, { forwardRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

interface Props {
  label: string;
  name?: string;
  type: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, name, type, isRequired, errorMessage, onChange }, ref) => (
    <FormControl mb="2" id={name} isRequired={isRequired || false} isInvalid={!!errorMessage}>
      <FormLabel>{label}</FormLabel>
      <Input onChange={onChange} name={name} type={type} ref={ref} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
);

export default InputField;
