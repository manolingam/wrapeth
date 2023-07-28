'use client';

import { Flex, useToast, HStack, Text } from '@chakra-ui/react';
import {
  useBalance,
  useAccount,
  useNetwork,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';

import { parseEther } from 'viem';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { SwapBox } from './components/swap';

import WethAbi from './abi.json';
import { wethAddrs } from './utils/contracts';

export default function Home() {
  const [type, setType] = useState('Wrap');
  const [tokenInput, setTokenInput] = useState(0);

  const toast = useToast();

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
    hash: type === 'Wrap' ? dataDeposit?.hash : datawithdraw?.hash,
    onSuccess(data) {
      toast({
        position: 'bottom-center',
        render: () => (
          <HStack color='white' p={3} fontSize='14px' bg='#1413146f'>
            <AiFillCheckCircle />{' '}
            <Text>Successfully {type}ed your tokens.</Text>
          </HStack>
        )
      });
    }
  });

  return (
    <Flex
      direction='column'
      justifyContent='space-between'
      maxW='90rem'
      minH='100vh'
      mx='auto'
      py='2rem'
      px={{ lg: '4rem', sm: '2rem' }}
      color='white'
    >
      <Header
        isTxLoading={isTxLoading}
        chain={chain}
        type={type}
        dataDeposit={dataDeposit}
        datawithdraw={datawithdraw}
      />
      <SwapBox
        unwrappedBalance={unwrappedBalance}
        wrappedBalance={wrappedBalance}
        tokenInput={tokenInput}
        setTokenInput={setTokenInput}
        type={type}
        setType={setType}
        chain={chain}
        address={address}
        isTxLoading={isTxLoading}
        writeDeposit={writeDeposit}
        withdrawDeposit={withdrawDeposit}
        withdrawLoading={withdrawLoading}
        depositLoading={depositLoading}
      />
      <Footer />
    </Flex>
  );
}
