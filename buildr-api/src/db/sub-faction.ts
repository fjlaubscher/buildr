import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getSubFactionsAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'select * from sub_faction order by description asc'
  );
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows);
};

export const getSubFactionByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from sub_faction where id = $1', [id]);
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows)[0];
};

export const getSubFactionsByFactionIdAsync = async (factionId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>(
    'select * from sub_faction where faction_id = $1 order by description asc',
    [factionId]
  );
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows);
};
