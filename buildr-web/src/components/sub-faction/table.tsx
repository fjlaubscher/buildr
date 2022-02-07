import React from 'react';
import { Button, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  subFactions: buildr.SubFaction[];
}

const SubFactionTable = ({ subFactions }: Props) => (
  <Table width="100%" mt="0 !important" size="sm">
    <Tbody>
      {subFactions.map((s) => (
        <Tr key={`sub-faction-${s.id}`}>
          <Td width="75%" pl={0}>
            {s.description}
          </Td>
          <Td width="25%" pr={0}>
            <Button
              size="sm"
              width="100%"
              as={Link}
              to={`/admin/sub-faction/${s.id}`}
              leftIcon={<MdEdit />}
            >
              Edit
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default SubFactionTable;
