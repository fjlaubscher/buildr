import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery
} from '@chakra-ui/react';

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const UnitDrawer = ({ title, children, isOpen, onClose }: Props) => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  return (
    <Drawer
      isOpen={isOpen}
      placement={isSmallDesktop ? 'right' : 'bottom'}
      size={isSmallDesktop ? 'md' : undefined}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody py={0}>{children}</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button form="list-unit-form" type="submit" colorScheme="blue">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UnitDrawer;
