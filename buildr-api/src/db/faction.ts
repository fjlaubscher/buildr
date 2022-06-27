import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getFactionsAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from faction order by description asc');
  await client.end();

  return mapFromPSQL<buildr.Faction>(rows);
};
