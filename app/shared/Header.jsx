'use client';

import {
  Flex,
  Text,
  HStack,
  Link as ChakraLink,
  Button,
  Spinner
} from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';
import { GiWrappedSweet } from 'react-icons/gi';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

import { blockExplorerBaseUrl } from '../utils/contracts';

export const Header = ({
  isTxLoading,
  chain,
  type,
  dataDeposit,
  datawithdraw
}) => {
  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb='2rem'
    >
      <HStack fontSize={{ lg: '24px', sm: '18px' }}>
        <GiWrappedSweet />
        <Text>Wrap-N-Wrap</Text>
      </HStack>
      <HStack>
        {isTxLoading && (
          <ChakraLink
            isExternal
            href={`${blockExplorerBaseUrl[chain.id]}/${
              type === 'Wrap' ? dataDeposit?.hash : datawithdraw?.hash
            }`}
          >
            <Button opacity='0.5' _hover={{ opacity: '1' }}>
              <HStack>
                <Spinner size='sm' />
                <Text fontSize={{ lg: '12px', sm: '10px' }}>View tx</Text>
                <FaExternalLinkSquareAlt />
              </HStack>
            </Button>
          </ChakraLink>
        )}
        <Web3Button />
      </HStack>
    </Flex>
  );
};
