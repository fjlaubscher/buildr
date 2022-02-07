import React from 'react';
import {
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  IconButton,
  useMediaQuery
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  subFactions: buildr.SubFaction[];
}

const SubFactionTable = ({ subFactions }: Props) => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  return (
    <Table width="100%" mt="0 !important" size="sm">
      <Tbody>
        {subFactions.map((s) => (
          <Tr key={`sub-faction-${s.id}`}>
            <Td width="85%" pl={0}>{s.description}</Td>
            <Td width="15%" pr={0}>
              {isSmallDesktop ? (
                <Button
                  size="sm"
                  width="100%"
                  as={Link}
                  to={`/admin/sub-faction/${s.id}`}
                  leftIcon={<MdEdit />}
                >
                  Edit
                </Button>
              ) : (
                <IconButton
                  aria-label="edit"
                  as={Link}
                  to={`/admin/sub-faction/${s.id}`}
                  icon={<MdEdit />}
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SubFactionTable;
