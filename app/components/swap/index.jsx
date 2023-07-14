'use client';

import {
  Flex,
  Box,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
  Button
} from '@chakra-ui/react';

import { MdSwapCalls } from 'react-icons/md';

import { tokenTickers, wethAddrs } from '@/app/utils/contracts';

export const SwapBox = ({
  unwrappedBalance,
  wrappedBalance,
  tokenInput,
  setTokenInput,
  type,
  setType,
  chain,
  address,
  isTxLoading,
  writeDeposit,
  withdrawDeposit,
  withdrawLoading,
  depositLoading
}) => {
  return (
    <Flex
      direction='column'
      borderRadius='10px'
      bg='#1413146f'
      p='2rem'
      w={{ lg: '500px', sm: '90%' }}
      mx='auto'
    >
      <Box
        border='2px solid #3F2E3E'
        borderRadius='5px'
        p='1rem'
        mb='.5rem'
        position='relative'
      >
        <HStack mb='10px' alignItems='flex-end' justifyContent='space-between'>
          <Text fontSize='12px' opacity='0.8' textTransform='uppercase'>
            From
          </Text>
          <Text fontSize='12px' opacity='0.8' textTransform='uppercase'>
            Balance:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 0
            }).format(
              Number(type === 'Wrap' ? unwrappedBalance : wrappedBalance)
            )}
          </Text>
        </HStack>
        <HStack>
          <NumberInput value={tokenInput} defaultValue={0} min={0}>
            <NumberInputField
              bg='transparent'
              border='none'
              color='white'
              outline='none'
              fontSize='28px'
              opacity='0.8'
              onChange={(e) => setTokenInput(e.target.value)}
            />
          </NumberInput>
          <Text textTransform='uppercase' fontWeight='bold'>
            {type === 'Wrap'
              ? tokenTickers[chain?.id]?.unwrappedToken
              : tokenTickers[chain?.id]?.wrappedToken}
          </Text>
        </HStack>

        <Box
          bg='#3F2E3E'
          color='white'
          position='absolute'
          left='45%'
          fontSize={{ lg: '2rem', sm: '1.5rem' }}
          opacity='0.7'
          border='2px solid #3F2E3E'
          borderRadius='50%'
          cursor='pointer'
          _hover={{ opacity: '1' }}
          onClick={() => {
            setType((prevstate) => (prevstate === 'Wrap' ? 'Unwrap' : 'Wrap'));
          }}
        >
          <MdSwapCalls />
        </Box>
      </Box>

      <Box border='2px solid #3F2E3E' borderRadius='5px' p='1rem'>
        <HStack mb='10px' alignItems='flex-end' justifyContent='space-between'>
          <Text
            fontSize='12px'
            opacity='0.8'
            mb='5px'
            textTransform='uppercase'
          >
            To
          </Text>
          <Text fontSize='12px' opacity='0.8' textTransform='uppercase'>
            Balance:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 0
            }).format(
              Number(type === 'Wrap' ? wrappedBalance : unwrappedBalance)
            )}
          </Text>
        </HStack>
        <HStack>
          <NumberInput value={tokenInput} defaultValue={0} min={0}>
            <NumberInputField
              bg='transparent'
              border='none'
              color='white'
              outline='none'
              fontSize='28px'
              opacity='0.8'
              onChange={(e) => setTokenInput(e.target.value)}
            />
          </NumberInput>
          <Text textTransform='uppercase' fontWeight='bold'>
            {type === 'Wrap'
              ? tokenTickers[chain?.id]?.wrappedToken
              : tokenTickers[chain?.id]?.unwrappedToken}
          </Text>
        </HStack>
      </Box>

      {chain?.id in wethAddrs ? (
        <Button
          mt='1rem'
          isLoading={depositLoading || withdrawLoading || isTxLoading}
          loadingText={'Transaction pending..'}
          isDisabled={
            Number(tokenInput) > 0
              ? type === 'Wrap'
                ? Number(tokenInput) >= Number(unwrappedBalance)
                : Number(tokenInput) >= Number(wrappedBalance)
              : true
          }
          onClick={() => (type === 'Wrap' ? writeDeposit() : withdrawDeposit())}
          _hover={{
            opacity: 0.7
          }}
        >
          {type}
        </Button>
      ) : (
        <Text
          mt='10px'
          mx='auto'
          fontSize='12px'
          opacity='0.7'
          fontStyle='italic'
        >
          {address ? 'Unsupported network!' : 'Connect your wallet'}
        </Text>
      )}
    </Flex>
  );
};
