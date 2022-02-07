import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  IconButton,
  useMediaQuery
} from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface Props {
  dataSheets: buildr.DataSheet[];
  onDeleteClick: (id: number) => void;
}

const DataSheetTable = ({ dataSheets, onDeleteClick }: Props) => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  return (
    <Table width="100%" mt="0 !important" size="sm">
      <Thead>
        <Tr>
          <Th pl={0}>Description</Th>
          <Th>Points</Th>
          <Th pr={0} />
        </Tr>
      </Thead>
      <Tbody>
        {dataSheets.map((d) => (
          <Tr key={`datasheet-${d.id}`}>
            <Td pl={0}>{d.description}</Td>
            <Td>{d.points}</Td>
            <Td pr={0}>
              <ButtonGroup size="sm" width="100%" justifyContent="flex-end">
                {isSmallDesktop ? (
                  <Button as={Link} to={`/admin/datasheet/${d.id}`} leftIcon={<MdEdit />}>
                    Edit
                  </Button>
                ) : (
                  <IconButton
                    aria-label="edit"
                    as={Link}
                    to={`/admin/datasheet/${d.id}`}
                    icon={<MdEdit />}
                  />
                )}
                {isSmallDesktop ? (
                  <Button
                    colorScheme="red"
                    onClick={() => onDeleteClick(d.id)}
                    leftIcon={<MdDelete />}
                  >
                    Delete
                  </Button>
                ) : (
                  <IconButton
                    aria-label="delete"
                    colorScheme="red"
                    onClick={() => onDeleteClick(d.id)}
                    icon={<MdDelete />}
                  />
                )}
              </ButtonGroup>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataSheetTable;
