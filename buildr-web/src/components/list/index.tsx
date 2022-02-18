import React from 'react';
import { VStack } from '@chakra-ui/react';

// components
import Section from './section';

// helpers
import { BattlefieldRoleTypes } from '../../helpers/battlefield-role';

interface Props {
  list: buildr.List;
  onDeleteClick: (key: string) => void;
  onDuplicateClick: (key: string) => void;
  onEditClick: (key: string) => void;
}

const List = ({ list, onDeleteClick, onDuplicateClick, onEditClick }: Props) => {
  const hqs = list.units.filter((u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.HQ);
  const troops = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.TROOPS
  );
  const elites = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.ELITES
  );
  const fastAttack = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.FAST_ATTACK
  );
  const flyers = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.FLYER
  );
  const heavySupport = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.HEAVY_SUPPORT
  );
  const fortifications = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.FORTIFICATION
  );
  const dedicatedTransports = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.DEDICATED_TRANSPORT
  );
  const lordsOfWar = list.units.filter(
    (u) => u.datasheet.battlefieldRoleId === BattlefieldRoleTypes.LORD_OF_WAR
  );

  return (
    <VStack width="100%">
      {hqs.length > 0 && (
        <Section
          title="HQ"
          image={`/battlefield-role/${BattlefieldRoleTypes.HQ}.png`}
          units={hqs}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {troops.length > 0 && (
        <Section
          title="Troops"
          image={`/battlefield-role/${BattlefieldRoleTypes.TROOPS}.png`}
          units={troops}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {elites.length > 0 && (
        <Section
          title="Elites"
          image={`/battlefield-role/${BattlefieldRoleTypes.ELITES}.png`}
          units={elites}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {fastAttack.length > 0 && (
        <Section
          title="Fast Attack"
          image={`/battlefield-role/${BattlefieldRoleTypes.FAST_ATTACK}.png`}
          units={fastAttack}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {flyers.length > 0 && (
        <Section
          title="Flyer"
          image={`/battlefield-role/${BattlefieldRoleTypes.FLYER}.png`}
          units={flyers}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {heavySupport.length > 0 && (
        <Section
          title="Heavy Support"
          image={`/battlefield-role/${BattlefieldRoleTypes.HEAVY_SUPPORT}.png`}
          units={heavySupport}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {fortifications.length > 0 && (
        <Section
          title="Fortification"
          image={`/battlefield-role/${BattlefieldRoleTypes.FORTIFICATION}.png`}
          units={fortifications}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {dedicatedTransports.length > 0 && (
        <Section
          title="Dedicated Transport"
          image={`/battlefield-role/${BattlefieldRoleTypes.DEDICATED_TRANSPORT}.png`}
          units={dedicatedTransports}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}

      {lordsOfWar.length > 0 && (
        <Section
          title="Lord of War"
          image={`/battlefield-role/${BattlefieldRoleTypes.LORD_OF_WAR}.png`}
          units={lordsOfWar}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onDuplicateClick={onDuplicateClick}
        />
      )}
    </VStack>
  );
};

export default List;
