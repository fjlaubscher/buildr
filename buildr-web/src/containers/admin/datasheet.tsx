import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  useDisclosure,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { useAsync, useAsyncFn, useMount } from 'react-use';
import { Link, useParams } from 'react-router-dom';
import { MdAdd, MdArrowBack, MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';

// api
import { getDataSheetByIdAsync, updateDataSheetAsync } from '../../api/datasheet';
import {
  getDataSheetUpgradesAsync,
  createDataSheetUpgradeAsync,
  updateDataSheetUpgradeAsync,
  deleteDataSheetUpgradeAsync
} from '../../api/datasheet-upgrade';

// components
import Layout from '../../components/layout';
import DrawerForm from '../../components/drawer-form';
import DataSheetForm from '../../components/datasheet/form';
import DataSheetUpgradeForm from '../../components/datasheet-upgrade/form';
import DataSheetUpgradeTable from '../../components/datasheet-upgrade/table';
import DeleteModal from '../../components/delete-modal';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';

const DEFAULT_VALUES: buildr.DataSheetUpgrade = {
  id: 0,
  datasheetId: 0,
  description: '',
  points: 0
};

const DataSheetAdmin = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');
  const { id } = useParams();
  const dataSheetId = id ? parseInt(id) : 0;

  const [isEdit, setIsEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  const dataSheetForm = useForm<buildr.DataSheet>({ mode: 'onChange' });
  const upgradeForm = useForm<buildr.DataSheet>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES
  });

  const { loading: loadingDataSheet, value: dataSheet } = useAsync(async () => {
    const data = await getDataSheetByIdAsync(dataSheetId);

    if (data) {
      dataSheetForm.reset(data);
    }

    return data;
  }, [dataSheetId]);
  const [{ loading: loadingUpgrades, value: upgrades }, fetchUpgrades] = useAsyncFn(
    () => getDataSheetUpgradesAsync(dataSheetId),
    [dataSheetId]
  );

  useMount(fetchUpgrades);

  return (
    <Layout
      title={dataSheet ? dataSheet.description : 'Loading'}
      isLoading={loadingDataSheet}
      actionComponent={
        <IconButton
          aria-label="save"
          colorScheme="blue"
          icon={<MdSave />}
          type="submit"
          form="datasheet-form"
          disabled={!dataSheetForm.formState.isValid || dataSheetForm.formState.isSubmitting}
          isLoading={dataSheetForm.formState.isSubmitting}
        />
      }
      isAdmin
    >
      <Button
        as={Link}
        to={`/admin/sub-faction/${dataSheet ? dataSheet.subFactionId : 0}`}
        leftIcon={<MdArrowBack />}
        mb={4}
      >
        Datasheets
      </Button>
      <SimpleGrid width="100%" columns={isSmallDesktop ? 2 : 1}>
        <GridItem>
          <Heading mb={4} size="lg">
            Details
          </Heading>
          <FormProvider {...dataSheetForm}>
            <DataSheetForm
              onSubmit={async (values) => {
                try {
                  if (dataSheet) {
                    const updated = await updateDataSheetAsync({ ...dataSheet, ...values });

                    if (updated) {
                      dataSheetForm.reset(updated);
                      toast({
                        title: SUCCESS_MESSAGE,
                        description: 'Datasheet updated.',
                        status: 'success',
                        isClosable: true
                      });
                    }
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
          </FormProvider>
        </GridItem>
        <GridItem
          ml={isSmallDesktop ? 8 : undefined}
          mt={isSmallDesktop ? undefined : '2rem !important'}
        >
          <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Heading mb={4} size="lg">
              Upgrades
            </Heading>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsEdit(false);
                onOpen();
              }}
              leftIcon={<MdAdd />}
            >
              Add
            </Button>
          </Box>
          {loadingUpgrades ? (
            <Center width="100%">
              <CircularProgress />
            </Center>
          ) : (
            <DataSheetUpgradeTable
              upgrades={upgrades || []}
              onEditClick={(upgrade) => {
                upgradeForm.reset(upgrade);
                setIsEdit(true);
                onOpen();
              }}
              onDeleteClick={setIdToDelete}
            />
          )}
        </GridItem>
      </SimpleGrid>

      <FormProvider {...upgradeForm}>
        <DrawerForm
          formId="datasheet-upgrade-form"
          title={`${isEdit ? 'Edit' : 'New'} Upgrade`}
          isOpen={isOpen}
          isSubmitting={upgradeForm.formState.isSubmitting}
          isValid={upgradeForm.formState.isValid}
          onClose={() => {
            upgradeForm.reset(DEFAULT_VALUES);
            onClose();
          }}
        >
          <DataSheetUpgradeForm
            onSubmit={async (values) => {
              try {
                if (isEdit) {
                  const updated = await updateDataSheetUpgradeAsync(values);

                  if (updated) {
                    upgradeForm.reset(DEFAULT_VALUES);
                    fetchUpgrades();
                    onClose();

                    toast({
                      title: SUCCESS_MESSAGE,
                      description: 'Upgrade updated.',
                      status: 'success',
                      isClosable: true
                    });
                  }
                } else {
                  const created = await createDataSheetUpgradeAsync({
                    ...values,
                    datasheetId: dataSheetId
                  });

                  if (created) {
                    upgradeForm.reset(DEFAULT_VALUES);
                    fetchUpgrades();
                    onClose();

                    toast({
                      title: SUCCESS_MESSAGE,
                      description: 'Upgrade created.',
                      status: 'success',
                      isClosable: true
                    });
                  }
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
          const result = await deleteDataSheetUpgradeAsync(id);
          if (result) {
            toast({
              title: SUCCESS_MESSAGE,
              description: 'Upgrade deleted.',
              status: 'success',
              isClosable: true
            });

            setIdToDelete(undefined);
            fetchUpgrades();
          } else {
            toast({
              title: ERROR_MESSAGE,
              description: `Failed to delete Upgrade with ${id}`,
              status: 'error',
              isClosable: true
            });
          }
        }}
      />
    </Layout>
  );
};

export default DataSheetAdmin;
