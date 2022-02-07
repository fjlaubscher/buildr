import React, { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { Progress } from '@chakra-ui/react';
import { useAsync } from 'react-use';

// api
import { getBattlefieldRolesAsync } from './api/battlefield-role';
import { getFactionsAsync } from './api/faction';

// state
import { BattlefieldRoleAtom, FactionAtom } from './state/config';

import Routes from './routes';

const Router = () => {
  const setBattlefieldRoles = useSetRecoilState(BattlefieldRoleAtom);
  const setFactions = useSetRecoilState(FactionAtom);

  const { loading } = useAsync(async () => {
    const [battlefieldRoles, factions] = await Promise.all([
      getBattlefieldRolesAsync(),
      getFactionsAsync()
    ]);

    if (battlefieldRoles) {
      setBattlefieldRoles(battlefieldRoles);
    }

    if (factions) {
      setFactions(factions);
    }
  });

  return loading ? (
    <Progress isIndeterminate />
  ) : (
    <Suspense fallback={<Progress isIndeterminate />}>
      <Routes />
    </Suspense>
  );
};

export default Router;
