import { atom } from 'recoil';

export const BattlefieldRoleAtom = atom<buildr.BattlefieldRole[]>({
  key: 'battlefield-roles',
  default: []
});

export const FactionAtom = atom<buildr.Faction[]>({
  key: 'factions',
  default: []
});

export const SubFactionAtom = atom<buildr.SubFactionDictionary>({
  key: 'sub-factions',
  default: {}
});
