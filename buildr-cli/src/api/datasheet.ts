import Fetch from '../helpers/fetch';

export const createDataSheetAsync = async (body: buildr.DataSheet) =>
  Fetch<buildr.DataSheet>(
    `${process.env.API_URL}/api/datasheet`,
    {
      auth: true,
      method: 'POST',
      body
    }
  );
