import { atom } from 'recoil';

export const ListAtom = atom<buildr.List>({
  key: 'list',
  default: {
    points: 0,
    factionId: 0,
    subFactionId: 0,
    units: []
  }
})