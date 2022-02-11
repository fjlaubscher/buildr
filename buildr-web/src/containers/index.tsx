import React, { useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Link,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { v4 as UUID } from 'uuid';
import { FormProvider, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

// components
import DrawerForm from '../components/drawer-form';
import ListCard from '../components/list/card';
import ListForm from '../components/list/form';
import Layout from '../components/layout';

// state
import { ListsAtom } from '../state/list';
import { LISTS_KEY } from '../helpers/storage';

const Home = () => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lists, setLists] = useRecoilState(ListsAtom);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLists = useMemo(
    () => (searchTerm ? lists.filter((l) => l.name.toLowerCase().includes(searchTerm)) : lists),
    [lists, searchTerm]
  );

  const form = useForm<buildr.List>({ mode: 'onChange' });

  return (
    <Layout title="Home">
      <Alert mb={4} height="auto" status="info">
        <AlertIcon alignSelf="flex-start" />
        <Box flex="1">
          <AlertTitle>👋 Hey!</AlertTitle>
          <AlertDescription display="block">
            buildr is a free and open-source Warhammer 40,000 List Builder.
            <br />
            <Link
              textDecoration="underline"
              href="https://github.com/fjlaubscher/buildr"
              target="_blank"
              rel="noopener"
            >
              https://github.com/fjlaubscher/buildr
            </Link>
          </AlertDescription>
        </Box>
      </Alert>
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Input
          maxWidth={isSmallDesktop ? '50%' : '70%'}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value.toLowerCase())}
        />
        <Button colorScheme="blue" leftIcon={<MdAdd />} onClick={onOpen}>
          New List
        </Button>
      </HStack>
      <Divider mt="1rem !important" mb="0.5rem !important" />
      {filteredLists.map((l) => (
        <ListCard
          key={l.key}
          list={l}
          onDeleteClick={() => {
            const newLists = lists.filter((sl) => sl.key !== l.key);
            setLists(newLists);
            localStorage.setItem(LISTS_KEY, JSON.stringify(newLists));
          }}
        />
      ))}
      <FormProvider {...form}>
        <DrawerForm
          formId="list-form"
          title="New List"
          isValid={form.formState.isValid}
          isSubmitting={form.formState.isSubmitting}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ListForm
            onSubmit={(list) => {
              const key = UUID();
              const newList: buildr.List = {
                ...list,
                key,
                units: [],
                points: 0
              };
              const newLists = [...lists, newList];
              setLists(newLists);
              localStorage.setItem(LISTS_KEY, JSON.stringify(newLists));

              onClose();
              navigate(`/list/${key}`);
            }}
          />
        </DrawerForm>
      </FormProvider>
    </Layout>
  );
};

export default Home;
