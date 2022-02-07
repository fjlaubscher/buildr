import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getSubFactionsAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from sub_faction');
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows);
};

export const getSubFactionByIdAsync = async (id: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from sub_faction WHERE id = $1', [id]);
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows)[0];
};

export const getSubFactionsByFactionIdAsync = async (factionId: number) => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('SELECT * from sub_faction WHERE faction_id = $1', [
    factionId
  ]);
  await client.end();

  return mapFromPSQL<buildr.SubFaction>(rows);
};
