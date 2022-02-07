import Fetch from '../helpers/fetch';

export const loginAsync = () => Fetch<boolean>('/api/login', { auth: true, method: 'POST' });
