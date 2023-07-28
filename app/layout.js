'use client';

import './globals.css';
import { Poppins } from 'next/font/google';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { gnosis, mainnet, goerli, sepolia, polygon } from 'wagmi/chains';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import { Providers } from './providers';
import { WALLETCONNECT_PROJECT_ID } from './config';

const poppins = Poppins({ subsets: ['latin'], weight: '500' });

const projectId = WALLETCONNECT_PROJECT_ID;

const chains = [gnosis, mainnet, goerli, sepolia, polygon];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <WagmiConfig config={wagmiConfig}>
          <Providers>
            <Box bg='linear-gradient(157.1deg, #22002b 0%, #390418 29.17%, #48093A 61.98%, #1F0442 100%)'>
              <Head>
                <title>WrapnWrap</title>
                <meta
                  name='description'
                  content='Wrap and Unwrap chain specific gas tokens.'
                />
                <meta property='og:title' content='WrapnWrap' />
                <meta
                  property='og:description'
                  content='Wrap and Unwrap chain specific gas tokens.'
                />
                <meta name='twitter:title' content='WrapnWrap' />
                <meta
                  name='twitter:description'
                  content='Wrap and Unwrap chain specific gas tokens.'
                />
              </Head>
              {children}
              <Analytics />
            </Box>
          </Providers>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </body>
    </html>
  );
}
