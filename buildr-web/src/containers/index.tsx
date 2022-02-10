import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Heading,
  Link,
  useDisclosure
} from '@chakra-ui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MdAdd, MdShare } from 'react-icons/md';

// components
import Layout from '../components/layout';
import SelectField from '../components/field/select';
import UnitDrawer from '../components/unit/drawer';
import UnitForm from '../components/unit/form';

// state
import { FactionAtom, SubFactionAtom } from '../state/config';
import { ListAtom } from '../state/list';
import UnitCard from '../components/unit/card';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const factions = useRecoilValue(FactionAtom);
  const subFactions = useRecoilValue(SubFactionAtom);
  const [list, setList] = useRecoilState(ListAtom);

  const showSubFactions = subFactions[list.factionId] && subFactions[list.factionId].length > 1;
  const hasSelectedFactionAndSubFaction = list.factionId && list.subFactionId;

  console.log(list);

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
      <SelectField
        label="Codex"
        options={factions}
        value={list.factionId}
        onChange={(value) => {
          const hasMultipleSubFactions = subFactions[value] && subFactions[value].length > 1;
          setList({
            factionId: value,
            subFactionId: hasMultipleSubFactions ? 0 : subFactions[value][0].id,
            units: [],
            points: 0
          });
        }}
      />
      {showSubFactions && (
        <SelectField
          label="Supplement"
          options={subFactions[list.factionId]}
          value={list.subFactionId}
          onChange={(value) => {
            setList({
              factionId: list.factionId,
              subFactionId: value,
              units: [],
              points: 0
            });
          }}
        />
      )}
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" py={4}>
        <Heading size="lg">List</Heading>
        {hasSelectedFactionAndSubFaction && (
          <Box display="flex" alignItems="center">
            <Button type="button" colorScheme="blue" onClick={onOpen} leftIcon={<MdAdd />}>
              Add Unit
            </Button>
            <Button ml={4} type="button" colorScheme="blue" leftIcon={<MdShare />}>
              Share
            </Button>
          </Box>
        )}
      </Box>
      <Divider />
      {list.units.map((u) => (
        <UnitCard key={u.key} unit={u} />
      ))}
      <UnitDrawer title="New Unit" isOpen={isOpen} onClose={onClose}>
        <UnitForm
          onSubmit={(unit) => {
            setList({ ...list, units: [...list.units, unit], points: list.points + unit.points });
            onClose();
          }}
        />
      </UnitDrawer>
    </Layout>
  );
};

export default Home;
