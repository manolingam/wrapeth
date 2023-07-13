'use client';

import {
  Flex,
  Image as ChakraImage,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex direction='column'>
      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <ChakraLink href='https://raidguild.org' isExternal>
          <ChakraImage src='/raidguild.webp' h={{ lg: '30px', sm: '20px' }} />
        </ChakraLink>
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
      <Text mt='10px' textAlign='center' fontSize='12px' opacity='0.7'>
        tribute by{' '}
        <ChakraLink
          href='https://twitter.com/saimano1996'
          isExternal
          fontWeight='bold'
        >
          Saimano
        </ChakraLink>
      </Text>
    </Flex>
  );
};
