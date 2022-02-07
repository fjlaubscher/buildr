import React from 'react';
import { Box, Center, CircularProgress, Heading } from '@chakra-ui/react';
import { useAsync } from 'react-use';
import { useRecoilValue } from 'recoil';

// api
import { getSubFactionsAsync } from '../../api/sub-faction';

// components
import Layout from '../../components/layout';
import SubFactionTable from '../../components/sub-faction/table';

// state
import { FactionAtom } from '../../state/config';

interface SubFactionDictionary {
  [key: number]: buildr.SubFaction[];
}

const Admin = () => {
  const factions = useRecoilValue(FactionAtom);
  const { loading, value: subFactionDictionary } = useAsync(async () => {
    const data = await getSubFactionsAsync();

    return data
      ? data.reduce((dict, sf) => {
          const otherSubFactions = dict[sf.factionId] || [];

          return {
            ...dict,
            [sf.factionId]: [...otherSubFactions, sf]
          };
        }, {} as SubFactionDictionary)
      : {};
  });

  return (
    <Layout title="Admin" isAdmin>
      {loading ? (
        <Center width="100%">
          <CircularProgress />
        </Center>
      ) : (
        factions.map((f) => (
          <Box key={`faction-${f.id}`} width="100%" mb="1rem !important">
            <Heading size="lg">{f.description}</Heading>
            {subFactionDictionary && subFactionDictionary[f.id] && (
              <SubFactionTable subFactions={subFactionDictionary[f.id]} />
            )}
          </Box>
        ))
      )}
    </Layout>
  );
};

export default Admin;
