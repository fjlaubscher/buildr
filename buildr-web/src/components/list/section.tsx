import React from 'react';
import { Heading, HStack, Image, VStack } from '@chakra-ui/react';

// components
import UnitCard from '../unit/card';

interface Props {
  image: string;
  title: string;
  units: buildr.List.Unit[];
  onDeleteClick: (key: string) => void;
  onDuplicateClick: (key: string) => void;
  onEditClick: (key: string) => void;
}

const ListSection = ({
  image,
  title,
  units,
  onDeleteClick,
  onDuplicateClick,
  onEditClick
}: Props) => (
  <VStack width="100%">
    <HStack width="100%">
      <Image width="2.5rem" src={image} alt={title} />
      <Heading size="sm">{title}</Heading>
    </HStack>
    {units.map((u) => (
      <UnitCard
        key={u.key}
        unit={u}
        onDeleteClick={() => onDeleteClick(u.key)}
        onDuplicateClick={() => onDuplicateClick(u.key)}
        onEditClick={() => onEditClick(u.key)}
      />
    ))}
  </VStack>
);

export default ListSection;
