import { atom } from 'recoil';
import { v4 as UUID } from 'uuid';

export const ListsAtom = atom<buildr.List[]>({
  key: 'lists',
  default: []
});

export const ListAtom = atom<buildr.List>({
  key: 'list',
  default: {
    key: UUID(),
    name: 'New List',
    factionId: 0,
    subFactionId: 0,
    units: [],
    points: 0
  }
});
