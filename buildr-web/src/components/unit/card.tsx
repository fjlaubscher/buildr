import React from 'react';
import {
  Button,
  Box,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  Portal
} from '@chakra-ui/react';
import { MdMoreHoriz, MdCopyAll, MdDelete, MdEdit } from 'react-icons/md';

interface Props {
  unit: buildr.List.Unit;
  onEditClick: () => void;
  onDuplicateClick: () => void;
  onDeleteClick: () => void;
}

const UnitCard = ({ unit, onEditClick, onDuplicateClick, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box position="relative" background={background} borderRadius={4} width="100%" p={4}>
      <VStack alignItems="flex-start" width="100%">
        <Popover matchWidth>
          <PopoverTrigger>
            <IconButton
              position="absolute"
              top={0}
              right={0}
              size="md"
              aria-label="Menu"
              icon={<MdMoreHoriz />}
              variant="ghost"
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Actions</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack width="100%">
                  <Button
                    width="100%"
                    size="sm"
                    type="button"
                    leftIcon={<MdEdit />}
                    onClick={onEditClick}
                  >
                    Edit
                  </Button>
                  <Button
                    width="100%"
                    size="sm"
                    type="button"
                    leftIcon={<MdCopyAll />}
                    onClick={onDuplicateClick}
                  >
                    Duplicate
                  </Button>
                  <Button
                    width="100%"
                    size="sm"
                    type="button"
                    colorScheme="red"
                    leftIcon={<MdDelete />}
                    onClick={onDeleteClick}
                  >
                    Delete
                  </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        <Text mt="0 !important">
          {unit.models > 1 ? `${unit.models} x ` : ''}
          {unit.datasheet.description} ({unit.points})
        </Text>
        {unit.upgrades && unit.upgrades.length && (
          <Wrap width="100%">
            {unit.upgrades.map((up, i) => (
              <WrapItem key={`${unit.key}-upgrade-${i}`}>
                <Tag size="sm" colorScheme="green">
                  {up.description}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </Box>
  );
};

export default UnitCard;
