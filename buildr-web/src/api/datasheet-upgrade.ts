import Fetch from '../helpers/fetch';

export const getDataSheetUpgradesAsync = async (dataSheetId: string | number) =>
  Fetch<buildr.DataSheetUpgrade[]>(`/api/datasheet/${dataSheetId}/upgrades`, { method: 'GET' });

export const createDataSheetUpgradeAsync = async (body: buildr.DataSheetUpgrade) =>
  Fetch<buildr.DataSheetUpgrade>(`/api/datasheet/${body.datasheetId}/upgrades`, {
    auth: true,
    method: 'POST',
    body
  });

export const getDataSheetUpgradeAsync = async (id: string | number) =>
  Fetch<buildr.DataSheet>(`/api/datasheet-upgrade/${id}`, { method: 'GET' });

export const updateDataSheetUpgradeAsync = async (body: buildr.DataSheetUpgrade) =>
  Fetch<buildr.DataSheetUpgrade>(`/api/datasheet-upgrade/${body.id}`, {
    auth: true,
    method: 'PUT',
    body
  });

export const deleteDataSheetUpgradeAsync = async (id: string | number) =>
  Fetch<boolean>(`/api/datasheet-upgrade/${id}`, { auth: true, method: 'DELETE' });
