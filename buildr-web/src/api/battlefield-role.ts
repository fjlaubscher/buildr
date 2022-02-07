import Fetch from '../helpers/fetch';

export const getBattlefieldRolesAsync = () =>
  Fetch<buildr.BattlefieldRole[]>('/api/battlefield-role', { method: 'GET' });
