import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getDatasheetUpgradeByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from datasheet_upgrade where id = $1', [
    id
  ]);
  await client.end();

  return mapFromPSQL<buildr.DataSheetUpgrade>(rows)[0];
};

export const getUpgradesByDataSheetIdAsync = async (dataSheetId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'SELECT * from datasheet_upgrade where datasheet_id = $1 order by description asc',
    [dataSheetId]
  );
  await client.end();

  return mapFromPSQL<buildr.DataSheetUpgrade>(rows);
};

export const createDataSheetUpgradeAsync = async (input: buildr.DataSheetUpgrade) => {
  const client = new Client();
  await client.connect();

  const query = `
    INSERT INTO datasheet_upgrade (
      datasheet_id,
      description,
      points
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const { rows } = await client.query<TableRow>(query, [
    input.datasheetId,
    input.description,
    input.points
  ]);
  await client.end();

  return getDatasheetUpgradeByIdAsync(rows[0].id as number);
};

export const updateDataSheetUpgradeAsync = async (input: buildr.DataSheetUpgrade) => {
  const client = new Client();
  await client.connect();

  const query = `
    UPDATE datasheet_upgrade
    SET datasheet_id = $1,
        description = $2,
        points = $3
    WHERE id = $4
  `;
  await client.query<TableRow>(query, [
    input.datasheetId,
    input.description,
    input.points,
    input.id
  ]);
  await client.end();

  return getDatasheetUpgradeByIdAsync(input.id);
};

export const deleteDataSheetUpgradeAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('DELETE FROM datasheet_upgrade WHERE id = $1', [
    id
  ]);
  await client.end();

  return rowCount === 1;
};
