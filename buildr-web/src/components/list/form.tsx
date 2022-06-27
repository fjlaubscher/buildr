import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';

// state
import { FactionAtom, SubFactionAtom } from '../../state/config';

interface Props {
  onSubmit: (values: buildr.List) => void;
}

const ListForm = ({ onSubmit }: Props) => {
  const factions = useRecoilValue(FactionAtom);
  const subFactions = useRecoilValue(SubFactionAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<buildr.List>();

  const { field: factionField } = useController({ name: 'factionId', defaultValue: 0, control });
  const { field: subFactionField } = useController({
    name: 'subFactionId',
    defaultValue: 0,
    control
  });

  const showSubFactions =
    subFactions[factionField.value] && subFactions[factionField.value].length > 1;

  return (
    <form id="list-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Name"
        type="text"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      <SelectField
        label="Faction"
        options={factions}
        value={factionField.value}
        onChange={(value) => {
          factionField.onChange(value);

          const hasMultipleSubFactions = subFactions[value] && subFactions[value].length > 1;
          if (!hasMultipleSubFactions) {
            subFactionField.onChange(subFactions[value][0].id);
          }
        }}
      />
      {showSubFactions && (
        <SelectField
          label="Legion"
          options={subFactions[factionField.value]}
          value={subFactionField.value}
          onChange={subFactionField.onChange}
        />
      )}
    </form>
  );
};

export default ListForm;
