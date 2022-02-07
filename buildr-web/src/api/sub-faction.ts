import Fetch from '../helpers/fetch';

export const getSubFactionsAsync = () =>
  Fetch<buildr.SubFaction[]>('/api/sub-faction', { method: 'GET' });

export const getSubFactionByIdAsync = (id: string | number) =>
  Fetch<buildr.SubFaction>(`/api/sub-faction/${id}`, { method: 'GET' });

export const getSubFactionsByFactionIdAsync = (factionId: string | number) =>
  Fetch<buildr.SubFaction[]>(`/api/faction/${factionId}/sub-factions`, { method: 'GET' });
