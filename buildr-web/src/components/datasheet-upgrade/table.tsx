import React from 'react';
import { Button, ButtonGroup, Table, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface Props {
  upgrades: buildr.DataSheetUpgrade[];
  onDeleteClick: (id: number) => void;
  onEditClick: (upgrade: buildr.DataSheetUpgrade) => void;
}

const DataSheetUpgradeTable = ({ upgrades, onDeleteClick, onEditClick }: Props) => (
  <Table width="100%" mt="0 !important" size="sm">
    <Thead>
      <Tr>
        <Th pl={0}>Description</Th>
        <Th>Points</Th>
        <Th pr={0} />
      </Tr>
    </Thead>
    <Tbody>
      {upgrades.map((u) => (
        <Tr key={`datasheet-${u.id}`}>
          <Td pl={0}>{u.description}</Td>
          <Td>{u.points}</Td>
          <Td pr={0}>
            <ButtonGroup size="sm" width="100%" justifyContent="flex-end">
              <Button onClick={() => onEditClick(u)} leftIcon={<MdEdit />}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => onDeleteClick(u.id)} leftIcon={<MdDelete />}>
                Delete
              </Button>
            </ButtonGroup>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default DataSheetUpgradeTable;
