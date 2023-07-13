'use client';

import {
  Flex,
  Box,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';

import {
  useBalance,
  useAccount,
  useNetwork,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';

import { parseEther } from 'viem';
import { useState } from 'react';
import { MdSwapCalls } from 'react-icons/md';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

import {
  tokenTickers,
  wethAddrs,
  blockExplorerBaseUrl
} from '@/app/utils/contracts';

import WethAbi from '../../abi.json';

export const SwapBox = () => {
  const [type, setType] = useState('Wrap');
  const [tokenInput, setTokenInput] = useState(0);

  const { address } = useAccount();
  const { chain } = useNetwork();

  const contractAddress = wethAddrs?.[chain?.id];

  const getUnwrappedBalance = useBalance({
    address,
    enabled: contractAddress?.length !== 0,
    watch: true
  });

  const getWrappedBalance = useBalance({
    address,
    enabled: contractAddress?.length !== 0,
    token: contractAddress,
    watch: true
  });

  const unwrappedBalance = getUnwrappedBalance.data?.formatted || '0';
  const wrappedBalance = getWrappedBalance.data?.formatted || '0';

  const {
    write: writeDeposit,
    data: dataDeposit,
    isLoading: depositLoading
  } = useContractWrite({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'deposit',
    value: BigInt(parseEther(tokenInput.toString())),
    onSuccess(data) {
      setTokenInput(0);
    }
  });

  const {
    write: withdrawDeposit,
    data: datawithdraw,
    isLoading: withdrawLoading
  } = useContractWrite({
    address: contractAddress || '',
    abi: WethAbi,
    functionName: 'withdraw',
    args: [BigInt(parseEther(tokenInput.toString()))],
    onSuccess(data) {
      setTokenInput(0);
    }
  });

  const { isLoading: isTxLoading } = useWaitForTransaction({
    hash: type === 'Wrap' ? dataDeposit?.hash : datawithdraw?.hash
  });

  return (
    <Flex
      direction='column'
      borderRadius='10px'
      bg='#1413146f'
      p='2rem'
      w={{ lg: '500px', sm: '90%' }}
      mx='auto'
      position='relative'
    >
      <Box border='2px solid #3F2E3E' borderRadius='5px' p='1rem' mb='.5rem'>
        <HStack mb='10px' alignItems='flex-end' justifyContent='space-between'>
          <Text fontSize='12px' opacity='0.8' textTransform='uppercase'>
            From
          </Text>
          <Text fontSize='12px' opacity='0.8' textTransform='uppercase'>
            Balance:{' '}
            {Number(
              type === 'Wrap' ? unwrappedBalance : wrappedBalance
            ).toFixed(2)}
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
            {Number(
              type === 'Wrap' ? wrappedBalance : unwrappedBalance
            ).toFixed(2)}
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
        <Flex
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <HStack alignItems='center' mt='1rem'>
            <Box
              bg='#3F2E3E'
              color='white'
              fontSize={{ lg: '2rem', sm: '1.5rem' }}
              opacity='0.7'
              border='2px solid #3F2E3E'
              borderRadius='50%'
              cursor='pointer'
              _hover={{ opacity: '1' }}
              onClick={() => {
                setType((prevstate) =>
                  prevstate === 'Wrap' ? 'Unwrap' : 'Wrap'
                );
              }}
            >
              <MdSwapCalls />
            </Box>
            <Button
              isLoading={depositLoading || withdrawLoading || isTxLoading}
              isDisabled={
                Number(tokenInput) > 0
                  ? type === 'Wrap'
                    ? Number(tokenInput) >= Number(unwrappedBalance)
                    : Number(tokenInput) >= Number(wrappedBalance)
                  : true
              }
              onClick={() =>
                type === 'Wrap' ? writeDeposit() : withdrawDeposit()
              }
              _hover={{
                opacity: 0.7
              }}
            >
              {type}
            </Button>
          </HStack>
          {isTxLoading && (
            <ChakraLink
              isExternal
              href={`${blockExplorerBaseUrl[chain.id]}/${
                type === 'Wrap' ? dataDeposit?.hash : datawithdraw?.hash
              }`}
            >
              <HStack mx='auto' ml='10px' mt='1rem' opacity='0.7'>
                <Text fontSize={{ lg: '12px', sm: '10px' }}>View tx</Text>
                <FaExternalLinkSquareAlt />
              </HStack>
            </ChakraLink>
          )}
        </Flex>
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
