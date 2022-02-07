import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Link } from '@chakra-ui/react';

// components
import Layout from '../components/layout';

const Home = () => {
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
    </Layout>
  );
};

export default Home;
