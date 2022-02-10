import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

// components
import Layout from '../../components/layout';
import SubFactionTable from '../../components/sub-faction/table';

// state
import { FactionAtom, SubFactionAtom } from '../../state/config';

const Admin = () => {
  const factions = useRecoilValue(FactionAtom);
  const subFactions = useRecoilValue(SubFactionAtom);

  return (
    <Layout title="Admin" isAdmin>
      {factions.map((f) => (
        <Box key={`faction-${f.id}`} width="100%" mb="1rem !important">
          <Heading size="lg">{f.description}</Heading>
          {subFactions[f.id] && <SubFactionTable subFactions={subFactions[f.id]} />}
        </Box>
      ))}
    </Layout>
  );
};

export default Admin;
