import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  valueToConfirm: string | number;
  onCancelClick: () => void;
  onDeleteClick: (id: string | number) => Promise<boolean | void | undefined>;
}

const DeleteModal = ({ isOpen, valueToConfirm, onCancelClick, onDeleteClick }: Props) => {
  const cancelRef = useRef(null);
  const toast = useToast();
  const [confirmedValue, setConfirmedValue] = useState('');
  const [deleting, setDeleting] = useState(false);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancelClick}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            You are about to delete a record
          </AlertDialogHeader>
          <AlertDialogBody>
            <VStack>
              <Text>
                To confirm deletion of this record, please enter <b>{valueToConfirm}</b> below and
                click Delete.
              </Text>
              <Input
                type="text"
                value={confirmedValue}
                onChange={(e) => setConfirmedValue(e.currentTarget.value)}
              />
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancelClick}>
              Cancel
            </Button>
            <Button
              disabled={confirmedValue !== `${valueToConfirm}` || deleting}
              isLoading={deleting}
              colorScheme="red"
              onClick={async () => {
                try {
                  setDeleting(true);
                  await onDeleteClick(valueToConfirm);
                } catch (ex: any) {
                  toast({
                    title: 'Error',
                    description: ex.message,
                    status: 'error',
                    isClosable: true
                  });
                } finally {
                  setDeleting(false);
                }
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
