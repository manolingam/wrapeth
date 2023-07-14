'use client';

import { Flex, Text, Link as ChakraLink, HStack } from '@chakra-ui/react';

import { FaTwitter, FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <Flex direction='column'>
      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <HStack alignItems='center'>
          <Text textAlign='center' fontSize='12px' opacity='0.7'>
            built by Saimano{' '}
          </Text>
          <ChakraLink
            href='https://twitter.com/saimano1996'
            isExternal
            fontWeight='bold'
          >
            <FaTwitter />
          </ChakraLink>
          <ChakraLink
            href='https://github.com/manolingam/wrapnwrap'
            isExternal
            fontWeight='bold'
          >
            <FaGithub />
          </ChakraLink>
        </HStack>
        <Text
          textTransform='uppercase'
          w='60%'
          textAlign='right'
          my='10px'
          fontSize='12px'
          opacity='0.7'
        >
          On Goerli, Gnosis & Ethereum Mainnet
        </Text>
      </Flex>
    </Flex>
  );
};
