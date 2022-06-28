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
  formId: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  onClose: () => void;
}

const DrawerForm = ({ formId, title, children, isOpen, isSubmitting, isValid, onClose }: Props) => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  return (
    <Drawer isOpen={isOpen} placement={isSmallDesktop ? 'right' : 'bottom'} size={isSmallDesktop ? 'md' : undefined} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            disabled={!isValid || isSubmitting}
            form={formId}
            type="submit"
            colorScheme="blue"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerForm;
