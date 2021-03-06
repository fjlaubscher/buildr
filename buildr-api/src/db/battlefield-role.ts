import { Client } from 'pg';
import { mapFromPSQL } from '../helpers';

export const getBattlefieldRolesAsync = async () => {
  const client = new Client();
  await client.connect();

  const { rows } = await client.query<TableRow>('select * from battlefield_role');
  await client.end();

  return mapFromPSQL<buildr.BattlefieldRole>(rows);
};
