import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { v4 as uuid } from 'uuid';

// api
import { getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync } from '../../api/datasheet';
import { getDataSheetUpgradesAsync } from '../../api/datasheet-upgrade';

// components
import RangeField from '../field/range';
import SelectField from '../field/select';

// state
import { BattlefieldRoleAtom } from '../../state/config';
import { ListAtom } from '../../state/list';
import { Center, CircularProgress, Divider, Heading } from '@chakra-ui/react';

interface Props {
  initialValues?: buildr.List.Unit;
  onSubmit: (values: buildr.List.Unit) => void;
}

const UnitForm = ({ onSubmit }: Props) => {
  const list = useRecoilValue(ListAtom);
  const roles = useRecoilValue(BattlefieldRoleAtom);

  const [battlefieldRoleId, setBattlefieldRoleId] = useState(0);
  const [datasheet, setDatasheet] = useState<buildr.DataSheet | undefined>(undefined);
  const [unit, setUnit] = useState<buildr.List.Unit | undefined>(undefined);

  const { loading: loadingDatasheets, value: datasheets } = useAsync(async () => {
    if (list.subFactionId && battlefieldRoleId) {
      return getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync(
        list.subFactionId,
        battlefieldRoleId
      );
    }

    return undefined;
  }, [list.subFactionId, battlefieldRoleId]);

  const { loading: loadingUpgrades, value: upgrades } = useAsync(async () => {
    if (datasheet) {
      return getDataSheetUpgradesAsync(datasheet.id);
    }

    return undefined;
  }, [datasheet]);

  return (
    <form
      id="list-unit-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (unit) {
          onSubmit(unit);
        }
      }}
    >
      <SelectField
        label="Battlefield Role"
        options={roles}
        value={battlefieldRoleId}
        onChange={setBattlefieldRoleId}
      />
      <SelectField
        label="Datasheet"
        isLoading={loadingDatasheets}
        options={
          datasheets
            ? datasheets.map((d) => ({ id: d.id, description: `${d.description} (${d.points})` }))
            : []
        }
        value={datasheet ? datasheet.id : 0}
        onChange={(id) => {
          if (datasheets) {
            const datasheet = datasheets.filter((d) => d.id === id)[0];
            setDatasheet(datasheet);
            setUnit({
              key: uuid(),
              datasheet: datasheet,
              upgrades: [],
              models: datasheet.minimumModels,
              points: datasheet.points * datasheet.minimumModels
            });
          }
        }}
      />
      {loadingUpgrades && (
        <Center width="100%">
          <CircularProgress color="blue" isIndeterminate />
        </Center>
      )}
      {unit && datasheet && datasheet.maximumModels > 1 && (
        <RangeField
          label="Models"
          minimum={datasheet.minimumModels}
          maximum={datasheet.maximumModels}
          value={unit.models}
          onChange={(value) => {
            if (value !== unit.models) {
              setUnit({
                ...unit,
                models: value,
                points: datasheet.points * value
              });
            }
          }}
        />
      )}
      {!loadingUpgrades && upgrades && upgrades.length > 0 && (
        <>
          <Heading mt="1rem !important" size="lg">
            Upgrades
          </Heading>
          <Divider my="1rem !important" />
          {upgrades.map((u) => {
            const total = unit ? unit.upgrades.filter((uu) => uu.id === u.id).length : 0;

            function onIncrement() {
              if (unit) {
                setUnit({
                  ...unit,
                  upgrades: [...unit.upgrades, u],
                  points: unit.points + u.points
                });
              }
            }

            function onDecrement() {
              if (unit) {
                const upgradeIndex = unit.upgrades.indexOf(u);
                setUnit({
                  ...unit,
                  upgrades: unit.upgrades.splice(upgradeIndex, 1),
                  points: unit.points - u.points
                });
              }
            }

            return (
              <RangeField
                key={`upgrade-${u.id}`}
                label={`${u.description} (${u.points})`}
                minimum={0}
                maximum={unit ? unit.models : 0}
                value={total}
                onChange={(value) => {
                  // this event fires for no reason, so we need the else-if
                  if (value > total) {
                    onIncrement();
                  } else if (value < total) {
                    onDecrement();
                  }
                }}
              />
            );
          })}
        </>
      )}
    </form>
  );
};

export default UnitForm;
