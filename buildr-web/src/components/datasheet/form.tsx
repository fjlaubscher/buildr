import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';

// state
import { BattlefieldRoleAtom } from '../../state/config';

interface Props {
  onSubmit: (values: buildr.DataSheet) => void;
}

const DataSheetForm = ({ onSubmit }: Props) => {
  const roles = useRecoilValue(BattlefieldRoleAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<buildr.DataSheet>();

  const { field: battlefieldRoleField } = useController({ name: 'battlefieldRoleId', control });

  return (
    <form id="datasheet-form" onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        label="Battlefield Role"
        options={roles}
        onChange={battlefieldRoleField.onChange}
        value={battlefieldRoleField.value}
      />
      <InputField
        label="Description"
        type="text"
        errorMessage={errors.description ? 'Required' : undefined}
        {...register('description', { required: true })}
      />
      <InputField
        label="Minimum Models"
        type="number"
        errorMessage={errors.minimumModels ? 'Required' : undefined}
        {...register('minimumModels', { required: true, valueAsNumber: true })}
      />
      <InputField
        label="Maximum Models"
        type="number"
        errorMessage={errors.maximumModels ? 'Required' : undefined}
        {...register('maximumModels', { required: true, valueAsNumber: true })}
      />
      <InputField
        label="Points (per model)"
        type="number"
        errorMessage={errors.points ? 'Required' : undefined}
        {...register('points', { required: true, valueAsNumber: true })}
      />
    </form>
  );
};

export default DataSheetForm;
