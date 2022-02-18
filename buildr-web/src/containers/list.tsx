import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  HStack,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MdAdd, MdShare, MdCopyAll } from 'react-icons/md';
import { v4 as UUID } from 'uuid';
import { useParams } from 'react-router-dom';

// components
import Layout from '../components/layout';
import ListView from '../components/list';
import UnitDrawer from '../components/unit/drawer';
import UnitForm from '../components/unit/form';

// helpers
import { LISTS_KEY } from '../helpers/storage';
import { PointsLimit, exportToChat } from '../helpers/list';
import { SUCCESS_MESSAGE } from '../helpers/messages';

// state
import { SubFactionAtom } from '../state/config';
import { ListAtom, ListsAtom } from '../state/list';

const List = () => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');
  const { key } = useParams();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const subFactions = useRecoilValue(SubFactionAtom);
  const [list, setList] = useRecoilState(ListAtom);
  const [lists, setLists] = useRecoilState(ListsAtom);

  const [unitToEdit, setUnitToEdit] = useState<buildr.List.Unit | undefined>(undefined);

  useEffect(() => {
    if (!list || list.key !== key) {
      const thisList = lists.filter((l) => l.key === key)[0];
      if (thisList) {
        setList(thisList);
      }
    }
  }, [lists, list, setList, key]);

  const subFaction = list.factionId
    ? subFactions[list.factionId].filter((sf) => sf.id === list.subFactionId)[0]
    : undefined;

  function saveListAndSync(updatedList: buildr.List) {
    setList(updatedList);

    // now sync with locally stored lists
    const otherLists = lists.filter((l) => l.key !== updatedList.key);
    const updatedLists = [...otherLists, updatedList];
    setLists(updatedLists);
    localStorage.setItem(LISTS_KEY, JSON.stringify(updatedLists));
  }

  return (
    <Layout
      title={list.name}
      actionComponent={
        <IconButton
          aria-label="Share"
          colorScheme="blue"
          icon={isSmallDesktop ? <MdCopyAll /> : <MdShare />}
          onClick={async () => {
            try {
              if (subFaction) {
                if (isSmallDesktop) {
                  await navigator.clipboard.writeText(
                    `${exportToChat(list, subFaction)}https://buildr.pileofshame.club`
                  );
                  toast({
                    title: SUCCESS_MESSAGE,
                    description: 'List copied',
                    status: 'success',
                    isClosable: true
                  });
                } else {
                  await navigator.share({
                    title: list.name,
                    text: exportToChat(list, subFaction),
                    url: 'https://buildr.pileofshame.club'
                  });
                  toast({
                    title: SUCCESS_MESSAGE,
                    description: 'List shared.',
                    status: 'success',
                    isClosable: true
                  });
                }
              }
            } catch (err) {
              console.error(err);
            }
          }}
        />
      }
    >
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Stat>
          <StatLabel>Faction</StatLabel>
          <StatNumber>{subFaction ? subFaction.description : ''}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel textAlign="right">Points</StatLabel>
          <StatNumber whiteSpace="nowrap" textAlign="right">
            {list.points}/{PointsLimit[list.gameSizeId]}
          </StatNumber>
        </Stat>
      </HStack>
      <HStack width="100%" mb="1rem !important" alignItems="center" justifyContent="flex-end">
        <Button
          colorScheme="blue"
          leftIcon={<MdAdd />}
          onClick={() => {
            setUnitToEdit(undefined);
            onOpen();
          }}
        >
          Add Unit
        </Button>
      </HStack>
      <Divider />
      <ListView
        list={list}
        onDeleteClick={(key) => {
          const unitToRemove = list.units.filter((u) => u.key === key)[0];
          saveListAndSync({
            ...list,
            units: list.units.filter((u) => u.key !== key),
            points: list.points - unitToRemove.points
          });
        }}
        onDuplicateClick={(key) => {
          const unitToDuplicate = list.units.filter((u) => u.key === key)[0];
          saveListAndSync({
            ...list,
            units: [...list.units, { ...unitToDuplicate, key: UUID() }],
            points: list.points + unitToDuplicate.points
          });
        }}
        onEditClick={(key) => {
          const unit = list.units.filter((u) => u.key === key)[0];
          setUnitToEdit(unit);
          onOpen();
        }}
      />
      <UnitDrawer title={unitToEdit ? 'Edit Unit' : 'New Unit'} isOpen={isOpen} onClose={onClose}>
        <UnitForm
          initialValues={unitToEdit}
          onSubmit={(unit) => {
            const existingUnits = unitToEdit
              ? list.units.filter((u) => u.key !== unitToEdit.key)
              : list.units;
            const listPoints = unitToEdit ? list.points - unitToEdit.points : list.points;

            saveListAndSync({
              ...list,
              units: [...existingUnits, unit],
              points: listPoints + unit.points
            });
            onClose();
          }}
        />
      </UnitDrawer>
    </Layout>
  );
};

export default List;
