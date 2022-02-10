import React from 'react';
import {
  Box,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

interface Props {
  unit: buildr.List.Unit;
  onDeleteClick?: () => void;
}

const UnitCard = ({ unit, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box position="relative" background={background} borderRadius={4} width="100%" p={4} zIndex={1}>
      {onDeleteClick && (
        <IconButton
          position="absolute"
          top={1}
          right={1}
          size="md"
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={onDeleteClick}
          variant="ghost"
          zIndex={2}
        />
      )}
      <VStack alignItems="flex-start" width="100%">
        <Text>
          {unit.datasheet.description} ({unit.points})
        </Text>
        <Wrap width="100%">
          {unit.upgrades.map((up, i) => (
            <WrapItem key={`${unit.key}-upgrade-${i}`}>
              <Tag size="sm" colorScheme="green">
                {up.description} ({up.points})
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
};

export default UnitCard;