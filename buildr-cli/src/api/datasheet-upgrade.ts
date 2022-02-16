import Fetch from '../helpers/fetch';

export const createDataSheetUpgradeAsync = async (body: buildr.DataSheetUpgrade) =>
  Fetch<buildr.DataSheetUpgrade>(
    `${process.env.API_URL}/api/datasheet/${body.datasheetId}/upgrades`,
    {
      auth: true,
      method: 'POST',
      body
    }
  );
