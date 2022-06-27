import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Stack, Checkbox, CircularProgress, Divider, Heading } from '@chakra-ui/react';
import { useAsync } from 'react-use';

// api
import { getSubFactionsAsync } from '../../api/sub-faction';

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

  const { loading, value: subFactions } = useAsync(getSubFactionsAsync);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<buildr.DataSheet>();

  const { field: battlefieldRoleField } = useController({ name: 'battlefieldRoleId', control });
  const { field: subFactionIdsField } = useController({
    name: 'subFactionIds',
    control,
    defaultValue: []
  });

  const subFactionIds = subFactions ? subFactions.map((s) => s.id) : [];

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
      <Heading my={4} size="sm" fontWeight="medium">
        Sub Factions
      </Heading>
      <Stack mt={2} spacing={2} direction="column">
        {subFactions ? (
          <>
            <Checkbox
              colorScheme="blue"
              isChecked={subFactionIds.join(',') === subFactionIdsField.value.join(',')}
              onChange={(e) => {
                if (e.target.checked) {
                  subFactionIdsField.onChange([...subFactionIds]);
                } else {
                  subFactionIdsField.onChange([]);
                }
              }}
            >
              Select All
            </Checkbox>
            <Divider />
            {subFactions.map((s) => (
              <Checkbox
                key={s.id}
                colorScheme="blue"
                isChecked={subFactionIdsField.value.includes(s.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    subFactionIdsField.onChange([...subFactionIdsField.value, s.id]);
                  } else {
                    subFactionIdsField.onChange(
                      subFactionIdsField.value.filter((id) => id !== s.id)
                    );
                  }
                }}
              >
                {s.description}
              </Checkbox>
            ))}
          </>
        ) : (
          <CircularProgress isIndeterminate />
        )}
      </Stack>
    </form>
  );
};

export default DataSheetForm;
