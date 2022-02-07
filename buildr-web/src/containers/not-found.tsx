import React from 'react';
import { Alert, AlertIcon, VStack } from '@chakra-ui/react';
import { GiBolterGun } from 'react-icons/gi';

// components
import Layout from '../components/layout';

const NotFound = () => (
  <Layout title="Not Found">
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      This page doesn&apos;t exist.
    </Alert>
    <VStack width="100%" height="100%" alignItems="center" justifyContent="center">
      <GiBolterGun fontSize="8rem" />
    </VStack>
  </Layout>
);

export default NotFound;
