'use client';

import { Flex, Text, HStack } from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import { GiWrappedSweet } from 'react-icons/gi';

export const Header = () => {
  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb='2rem'
    >
      <HStack fontSize={{ lg: '24px', sm: '18px' }}>
        <GiWrappedSweet />
        <Text>Wrapeth</Text>
      </HStack>
      <Web3Button />
    </Flex>
  );
};
