import React from 'react';
import {
  Box,
  Button,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MdVisibility, MdDelete } from 'react-icons/md';

// state
import { SubFactionAtom } from '../../state/config';

interface Props {
  list: buildr.List;
  onDeleteClick: () => void;
}

const ListCard = ({ list, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');
  const subFactions = useRecoilValue(SubFactionAtom);
  const subFaction = subFactions[list.factionId].filter((sf) => sf.id === list.subFactionId)[0];

  return (
    <Box
      position="relative"
      background={background}
      borderRadius={4}
      width="100%"
      p={4}
      zIndex={1}
      textDecoration="none"
    >
      <HStack position="absolute" top={1} right={1}>
        <IconButton
          size="md"
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={onDeleteClick}
          variant="ghost"
          zIndex={2}
        />
      </HStack>
      <VStack alignItems="flex-start" width="100%">
        <Text>
          {list.name} {list.points ? `(${list.points})` : ''}
        </Text>
        <Wrap width="100%">
          <WrapItem>
            <Tag size="sm">{subFaction.description}</Tag>
          </WrapItem>
        </Wrap>
        <Button
          type="button"
          as={Link}
          to={`/list/${list.key}`}
          size="sm"
          leftIcon={<MdVisibility />}
        >
          View
        </Button>
      </VStack>
    </Box>
  );
};

export default ListCard;
