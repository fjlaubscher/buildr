import Fetch from '../helpers/fetch';

export const getDataSheetsAsync = async () =>
  Fetch<buildr.DataSheet[]>('/api/datasheet', { method: 'GET' });

export const getDataSheetsBySubFactionIdAsync = async (subFactionId: string | number) =>
  Fetch<buildr.DataSheet[]>(`/api/sub-faction/${subFactionId}/datasheets`, { method: 'GET' });

export const getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync = async (
  subFactionId: string | number,
  battlefieldRoleId: string | number
) =>
  Fetch<buildr.DataSheet[]>(
    `/api/sub-faction/${subFactionId}/datasheets/by-battlefield-role/${battlefieldRoleId}`,
    { method: 'GET' }
  );

export const createDataSheetAsync = async (body: buildr.DataSheet) =>
  Fetch<buildr.DataSheet>(`/api/datasheet`, {
    auth: true,
    method: 'POST',
    body
  });

export const getDataSheetByIdAsync = async (id: string | number) =>
  Fetch<buildr.DataSheet>(`/api/datasheet/${id}`, { method: 'GET' });

export const updateDataSheetAsync = async (body: buildr.DataSheet) =>
  Fetch<buildr.DataSheet>(`/api/datasheet/${body.id}`, { auth: true, method: 'PUT', body });

export const deleteDataSheetAsync = async (id: string | number) =>
  Fetch<boolean>(`/api/datasheet/${id}`, { auth: true, method: 'DELETE' });
