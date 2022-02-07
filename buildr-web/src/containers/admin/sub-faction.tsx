import React, { useState } from 'react';
import {
  Button,
  Center,
  CircularProgress,
  Heading,
  IconButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useAsync, useAsyncFn, useMount } from 'react-use';
import { Link, useParams } from 'react-router-dom';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';

// api
import { getSubFactionByIdAsync } from '../../api/sub-faction';
import {
  getDataSheetsBySubFactionIdAsync,
  deleteDataSheetAsync,
  createDataSheetAsync
} from '../../api/datasheet';

// components
import Layout from '../../components/layout';
import DrawerForm from '../../components/drawer-form';
import DataSheetForm from '../../components/datasheet/form';
import DataSheetTable from '../../components/datasheet/table';
import DeleteModal from '../../components/delete-modal';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';

const DEFAULT_VALUES: buildr.DataSheet = {
  id: 0,
  battlefieldRoleId: 0,
  subFactionId: 0,
  minimumModels: 1,
  maximumModels: 1,
  description: '',
  points: 0
};

const SubFactionAdmin = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const subFactionId = id ? parseInt(id) : 0;

  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  const { loading: loadingSubFaction, value: subFaction } = useAsync(
    () => getSubFactionByIdAsync(subFactionId),
    [subFactionId]
  );
  const [{ loading: loadingDataSheets, value: dataSheets }, fetchDatasheets] = useAsyncFn(
    () => getDataSheetsBySubFactionIdAsync(subFactionId),
    [subFactionId]
  );

  const form = useForm<buildr.DataSheet>({ mode: 'onChange', defaultValues: DEFAULT_VALUES });

  useMount(fetchDatasheets);

  return (
    <Layout
      title={subFaction ? subFaction.description : 'Loading'}
      isLoading={loadingSubFaction}
      actionComponent={
        <IconButton
          aria-label="Add Datasheet"
          colorScheme="blue"
          onClick={onOpen}
          icon={<MdAdd />}
        />
      }
      isAdmin
    >
      <Button as={Link} to="/admin/" leftIcon={<MdArrowBack />} mb={4}>
        Factions
      </Button>
      <Heading mb="1rem !important" size="lg">
        Datasheets
      </Heading>
      {loadingDataSheets ? (
        <Center width="100%">
          <CircularProgress />
        </Center>
      ) : (
        <DataSheetTable dataSheets={dataSheets || []} onDeleteClick={setIdToDelete} />
      )}
      <FormProvider {...form}>
        <DrawerForm
          formId="datasheet-form"
          title="New Datasheet"
          isOpen={isOpen}
          isSubmitting={form.formState.isSubmitting}
          isValid={form.formState.isValid}
          onClose={() => {
            form.reset(DEFAULT_VALUES);
            onClose();
          }}
        >
          <DataSheetForm
            onSubmit={async (values) => {
              try {
                const created = await createDataSheetAsync({ ...values, subFactionId });

                if (created) {
                  fetchDatasheets();
                  onClose();

                  toast({
                    title: SUCCESS_MESSAGE,
                    description: 'Datasheet created.',
                    status: 'success',
                    isClosable: true
                  });
                }
              } catch (ex: any) {
                toast({
                  title: ERROR_MESSAGE,
                  description: ex.message,
                  status: 'error',
                  isClosable: true
                });
              }
            }}
          />
        </DrawerForm>
      </FormProvider>
      <DeleteModal
        isOpen={!!idToDelete}
        valueToConfirm={idToDelete || ''}
        onCancelClick={() => {
          setIdToDelete(undefined);
        }}
        onDeleteClick={async (id) => {
          const result = await deleteDataSheetAsync(id);
          if (result) {
            toast({
              title: SUCCESS_MESSAGE,
              description: 'Datasheet deleted.',
              status: 'success',
              isClosable: true
            });

            setIdToDelete(undefined);
            fetchDatasheets();
          } else {
            toast({
              title: ERROR_MESSAGE,
              description: `Failed to delete Datasheet with ${id}`,
              status: 'error',
              isClosable: true
            });
          }
        }}
      />
    </Layout>
  );
};

export default SubFactionAdmin;
