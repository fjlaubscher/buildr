import React from 'react';
import {
  Box,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  HStack
} from '@chakra-ui/react';
import { MdCopyAll, MdDelete, MdEdit } from 'react-icons/md';

interface Props {
  unit: buildr.List.Unit;
  onEditClick: () => void;
  onDuplicateClick: () => void;
  onDeleteClick: () => void;
}

const UnitCard = ({ unit, onEditClick, onDuplicateClick, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box position="relative" background={background} borderRadius={4} width="100%" p={4} zIndex={1}>
      <HStack position="absolute" top={1} right={1} zIndex={3}>
        <IconButton
          size="md"
          aria-label="Edit"
          icon={<MdEdit />}
          onClick={onEditClick}
          variant="ghost"
        />
        <IconButton
          size="md"
          aria-label="Duplicate"
          icon={<MdCopyAll />}
          onClick={onDuplicateClick}
          variant="ghost"
        />
        <IconButton
          size="md"
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={onDeleteClick}
          variant="ghost"
        />
      </HStack>
      <VStack alignItems="flex-start" width="100%">
        <Text>
          {unit.models > 1 ? `${unit.models} x ` : ''}
          {unit.datasheet.description} ({unit.points})
        </Text>
        <Wrap width="100%">
          {unit.upgrades.map((up, i) => (
            <WrapItem key={`${unit.key}-upgrade-${i}`}>
              <Tag size="sm" colorScheme="green">
                {up.description}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
};

export default UnitCard;
