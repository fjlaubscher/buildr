import React, { useState } from 'react';
import { Heading, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { useAsyncFn, useMount } from 'react-use';
import { MdAdd } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';

// api
import {
  getDataSheetsAsync,
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
  subFactionIds: [],
  minimumModels: 1,
  maximumModels: 1,
  description: '',
  points: 0
};

const Admin = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  const [{ loading, value: dataSheets }, fetchDatasheets] = useAsyncFn(getDataSheetsAsync);

  const form = useForm<buildr.DataSheet>({ mode: 'onChange', defaultValues: DEFAULT_VALUES });

  useMount(fetchDatasheets);

  return (
    <Layout
      title="Admin"
      isLoading={loading}
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
      <Heading mb="1rem !important" size="lg">
        Datasheets
      </Heading>
      <DataSheetTable dataSheets={dataSheets || []} onDeleteClick={setIdToDelete} />
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
                const created = await createDataSheetAsync({ ...values });

                if (created) {
                  form.reset(DEFAULT_VALUES);
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

export default Admin;
