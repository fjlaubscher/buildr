import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { v4 as UUID } from 'uuid';
import {
  Accordion,
  Button,
  Center,
  CircularProgress,
  GridItem,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

// api
import { getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync } from '../../api/datasheet';
import { getDataSheetUpgradesAsync } from '../../api/datasheet-upgrade';

// components
import AccordionItem from '../accordion-item';
import RangeField from '../field/range';
import Select from '../select';

// state
import { BattlefieldRoleAtom } from '../../state/config';
import { ListAtom } from '../../state/list';

interface Props {
  initialValues?: buildr.List.Unit;
  onSubmit: (values: buildr.List.Unit) => void;
}

const UnitForm = ({ onSubmit }: Props) => {
  const list = useRecoilValue(ListAtom);
  const roles = useRecoilValue(BattlefieldRoleAtom);

  const [accordionIndex, setAccordionIndex] = useState(0);
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
      const upgrades = await getDataSheetUpgradesAsync(datasheet.id);
      if (datasheet.minimumModels === datasheet.maximumModels && upgrades && upgrades.length > 1) {
        setAccordionIndex(accordionIndex + 1);
      }

      return upgrades;
    }

    return undefined;
  }, [datasheet]);

  const showTotalModels = datasheet && datasheet.maximumModels > 1;
  const dataSheetCost = datasheet && unit ? unit.models * datasheet.points : 0;
  const upgradesCost = unit ? unit.points - dataSheetCost : 0;
  const showUpgrades = !loadingUpgrades && upgrades && upgrades.length > 0;

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
      <Accordion
        width="100%"
        index={[accordionIndex]}
        onChange={(expandedIndex) => setAccordionIndex(expandedIndex as number)}
      >
        <AccordionItem title="Battlefield Role">
          <SimpleGrid mb={4} columns={3} rowGap={4}>
            {roles.map((r) => (
              <GridItem
                key={`battlefield-role-${r.id}`}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifySelf="center"
              >
                <Button
                  colorScheme={battlefieldRoleId === r.id ? 'blue' : undefined}
                  p={1}
                  width="5rem"
                  height="5rem"
                  type="button"
                  fontSize="xs"
                  onClick={() => {
                    setBattlefieldRoleId(r.id);
                    setAccordionIndex(1);
                  }}
                  whiteSpace="pre-wrap"
                >
                  <img src={`/battlefield-role/${r.id}.png`} alt={r.description} />
                </Button>
                <Text textAlign="center" fontSize="sm">
                  {r.description}
                </Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </AccordionItem>
        <AccordionItem title={`Datasheet ${dataSheetCost ? `(${dataSheetCost})` : ''}`}>
          <Select
            isLoading={loadingDatasheets}
            options={datasheets}
            value={datasheet ? datasheet.id : 0}
            onChange={(id) => {
              if (datasheets) {
                const datasheet = datasheets.filter((d) => d.id === id)[0];
                setDatasheet(datasheet);
                setUnit({
                  key: UUID(),
                  datasheet: datasheet,
                  upgrades: [],
                  models: datasheet.minimumModels,
                  points: datasheet.points * datasheet.minimumModels
                });
              }
            }}
            mb={showTotalModels ? 2 : undefined}
          />
          {showTotalModels && (
            <RangeField
              label="Models"
              minimum={datasheet.minimumModels}
              maximum={datasheet.maximumModels}
              value={unit ? unit.models : 0}
              onChange={(value) => {
                if (unit && value !== unit.models) {
                  setUnit({
                    ...unit,
                    models: value,
                    points: datasheet.points * value
                  });
                }
              }}
            />
          )}
        </AccordionItem>
        {showUpgrades && (
          <AccordionItem title={`Upgrades ${upgradesCost ? `(${upgradesCost})` : ''}`}>
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
                  const upgrades = unit.upgrades;
                  upgrades.splice(upgradeIndex, 1);

                  setUnit({
                    ...unit,
                    upgrades,
                    points: unit.points - u.points
                  });
                }
              }

              return (
                <RangeField
                  key={`upgrade-${u.id}`}
                  label={u.description}
                  minimum={0}
                  maximum={unit ? unit.models : 0}
                  value={total}
                  onChange={(value) => {
                    // this event fires on init, so we need the else-if
                    if (value > total) {
                      onIncrement();
                    } else if (value < total) {
                      onDecrement();
                    }
                  }}
                />
              );
            })}
          </AccordionItem>
        )}
      </Accordion>
      {loadingUpgrades && (
        <Center width="100%">
          <CircularProgress size="2rem" isIndeterminate />
        </Center>
      )}
    </form>
  );
};

export default UnitForm;
