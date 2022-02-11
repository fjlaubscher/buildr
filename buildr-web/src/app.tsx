import React, { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { Progress } from '@chakra-ui/react';
import { useAsync } from 'react-use';

// api
import { getBattlefieldRolesAsync } from './api/battlefield-role';
import { getFactionsAsync } from './api/faction';
import { getSubFactionsAsync } from './api/sub-faction';

// state
import { BattlefieldRoleAtom, FactionAtom, SubFactionAtom } from './state/config';
import { ListsAtom } from './state/list';

// storage
import { LISTS_KEY } from './helpers/storage';

import Routes from './routes';

const Router = () => {
  const setBattlefieldRoles = useSetRecoilState(BattlefieldRoleAtom);
  const setFactions = useSetRecoilState(FactionAtom);
  const setSubFactions = useSetRecoilState(SubFactionAtom);
  const setLists = useSetRecoilState(ListsAtom);

  const storedLists = localStorage.getItem(LISTS_KEY);
  if (storedLists) {
    const parsedLists = JSON.parse(storedLists) as buildr.List[];
    setLists(parsedLists);
  }

  const { loading } = useAsync(async () => {
    const [battlefieldRoles, factions, subFactions] = await Promise.all([
      getBattlefieldRolesAsync(),
      getFactionsAsync(),
      getSubFactionsAsync()
    ]);

    if (battlefieldRoles) {
      setBattlefieldRoles(battlefieldRoles);
    }

    if (factions) {
      setFactions(factions);
    }

    if (subFactions) {
      const dict = subFactions.reduce((dict, sf) => {
        const otherSubFactions = dict[sf.factionId] || [];

        return {
          ...dict,
          [sf.factionId]: [...otherSubFactions, sf]
        };
      }, {} as buildr.SubFactionDictionary);
      setSubFactions(dict);
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
