import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getDatasheetByIdAsync = async (dataSheetId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from datasheet where id = $1', [
    dataSheetId
  ]);
  await client.end();

  return mapFromPSQL<buildr.DataSheet>(rows)[0];
};

export const getDataSheetsBySubFactionIdAsync = async (subFactionId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'SELECT * from datasheet where sub_faction_id = $1 order by description asc ',
    [subFactionId]
  );
  await client.end();

  return mapFromPSQL<buildr.DataSheet>(rows);
};

export const getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync = async (subFactionId: number, battlefieldRoleId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'SELECT * from datasheet where sub_faction_id = $1 and battlefield_role_id = $2 order by description asc ',
    [subFactionId, battlefieldRoleId]
  );
  await client.end();

  return mapFromPSQL<buildr.DataSheet>(rows);
};

export const createDataSheetAsync = async (input: buildr.DataSheet) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO datasheet (
      battlefield_role_id,
      sub_faction_id,
      minimum_models,
      maximum_models,
      description,
      points
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const { rows } = await client.query<TableRow>(query, [
    input.battlefieldRoleId,
    input.subFactionId,
    input.minimumModels,
    input.maximumModels,
    input.description,
    input.points
  ]);
  await client.end();

  return getDatasheetByIdAsync(rows[0].id as number);
};

export const updateDataSheetAsync = async (input: buildr.DataSheet) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE datasheet
    SET battlefield_role_id = $1,
        sub_faction_id = $2,
        minimum_models = $3,
        maximum_models = $4,
        description = $5,
        points = $6  
    WHERE id = $7
  `;
  await client.query<TableRow>(query, [
    input.battlefieldRoleId,
    input.subFactionId,
    input.minimumModels,
    input.maximumModels,
    input.description,
    input.points,
    input.id
  ]);
  await client.end();

  return getDatasheetByIdAsync(input.id);
};

export const deleteDataSheetAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM datasheet WHERE id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
