import React from 'react';
import { useFormContext } from 'react-hook-form';

// components
import InputField from '../field/input';

interface Props {
  onSubmit: (values: buildr.DataSheetUpgrade) => void;
}

const DataSheetUpgradeForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<buildr.DataSheetUpgrade>();

  return (
    <form id="datasheet-upgrade-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Description"
        type="text"
        errorMessage={errors.description ? 'Required' : undefined}
        {...register('description', { required: true })}
      />
      <InputField
        label="Points"
        type="number"
        errorMessage={errors.points ? 'Required' : undefined}
        {...register('points', { required: true, valueAsNumber: true })}
      />
    </form>
  );
};

export default DataSheetUpgradeForm;
