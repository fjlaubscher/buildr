import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getDatasheetByIdAsync = async (dataSheetId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from datasheet where id = $1', [
    dataSheetId
  ]);
  const { rows: subFactionIdRows } = await client.query<TableRow>(
    'select sub_faction_id from sub_faction_datasheet where datasheet_id = $1',
    [dataSheetId]
  );
  await client.end();
  
  const datasheet = mapFromPSQL<buildr.DataSheet>(rows)[0];
  const subFactionIds = subFactionIdRows.map((r) => r['sub_faction_id'] as number);
  return { ...datasheet, subFactionIds } as buildr.DataSheet;
};

export const getDataSheetsAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from datasheet');
  await client.end();
  
  return mapFromPSQL<buildr.DataSheet>(rows);
}

export const getDataSheetsBySubFactionIdAsync = async (subFactionId: number) => {
  const client = new Client();
  await client.connect();

  const query = `
    select d.*
    from datasheet d
    inner join sub_faction_datasheet sfd on sfd.datasheet_id = d.id
    where sfd.sub_faction_id = $1
    order by d.description asc
  `;
  const { rows } = await client.query<TableRow>(query, [subFactionId]);
  await client.end();

  return mapFromPSQL<buildr.DataSheet>(rows);
};

export const getDataSheetsBySubFactionIdAndBattlefieldRoleIdAsync = async (
  subFactionId: number,
  battlefieldRoleId: number
) => {
  const client = new Client();
  await client.connect();

  const query = `
    select d.*
    from datasheet d
    inner join sub_faction_datasheet sfd on sfd.datasheet_id = d.id
    where sfd.sub_faction_id = $1 and d.battlefield_role_id = $2
    order by d.description asc
  `;
  const { rows } = await client.query<TableRow>(query, [subFactionId, battlefieldRoleId]);
  await client.end();

  return mapFromPSQL<buildr.DataSheet>(rows);
};

export const createDataSheetAsync = async (input: buildr.DataSheet) => {
  const client = new Client();
  await client.connect();

  const query = `
    insert into datasheet (
      battlefield_role_id,
      minimum_models,
      maximum_models,
      description,
      points
    )
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const { rows } = await client.query<TableRow>(query, [
    input.battlefieldRoleId,
    input.minimumModels,
    input.maximumModels,
    input.description,
    input.points
  ]);

  const datasheetId = mapFromPSQL<buildr.DataSheet>(rows)[0].id;
  const insertQuery = `
    insert into sub_faction_datasheet (datasheet_id, sub_faction_id)
    values ${input.subFactionIds.map((id) => `(${datasheetId}, ${id})`).join(', ')}
  `;
  await client.query<TableRow>(insertQuery);
  await client.end();

  return getDatasheetByIdAsync(datasheetId);
};

export const updateDataSheetAsync = async (input: buildr.DataSheet) => {
  const client = new Client();
  await client.connect();

  const query = `
    update datasheet
    set battlefield_role_id = $1,
        minimum_models = $2,
        maximum_models = $3,
        description = $4,
        points = $5  
    where id = $6
  `;
  await client.query<TableRow>(query, [
    input.battlefieldRoleId,
    input.minimumModels,
    input.maximumModels,
    input.description,
    input.points,
    input.id
  ]);
  
  await client.query<TableRow>('delete from sub_faction_datasheet where datasheet_id = $1', [input.id]);
  
  const insertQuery = `
    insert into sub_faction_datasheet (datasheet_id, sub_faction_id)
    values ${input.subFactionIds.map((id) => `(${input.id}, ${id})`).join(', ')}
  `;
  await client.query<TableRow>(insertQuery);
  await client.end();

  return getDatasheetByIdAsync(input.id);
};

export const deleteDataSheetAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rowCount } = await client.query<TableRow>('delete from datasheet where id = $1', [id]);
  await client.end();

  return rowCount === 1;
};
