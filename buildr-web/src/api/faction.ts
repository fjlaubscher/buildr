import Fetch from '../helpers/fetch';

export const getFactionsAsync = () => Fetch<buildr.Faction[]>('/api/faction', { method: 'GET' });
