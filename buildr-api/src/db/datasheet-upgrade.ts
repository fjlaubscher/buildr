import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getDatasheetUpgradeByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from datasheet_upgrade where id = $1', [
    id
  ]);
  await client.end();

  return mapFromPSQL<buildr.DataSheetUpgrade>(rows)[0];
};

export const getUpgradesByDataSheetIdAsync = async (dataSheetId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'select * from datasheet_upgrade where datasheet_id = $1 order by description asc',
    [dataSheetId]
  );
  await client.end();

  return mapFromPSQL<buildr.DataSheetUpgrade>(rows);
};

export const createDataSheetUpgradeAsync = async (input: buildr.DataSheetUpgrade) => {
  const client = new Client();
  await client.connect();

  const query = `
    insert into datasheet_upgrade (
      datasheet_id,
      description,
      points
    )
    values ($1, $2, $3)
    returning *
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
    update datasheet_upgrade
    set datasheet_id = $1,
        description = $2,
        points = $3
    where id = $4
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

  const { rowCount } = await client.query<TableRow>('delete from datasheet_upgrade where id = $1', [
    id
  ]);
  await client.end();

  return rowCount === 1;
};
