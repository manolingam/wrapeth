export const wethAddrs = {
  1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  100: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  5: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
  // 11155111: '0xf531B8F309Be94191af87605CfBf600D71C2cFe0'
};

export const tokenTickers = {
  1: {
    unwrappedToken: 'eth',
    wrappedToken: 'weth'
  },
  100: {
    unwrappedToken: 'xdai',
    wrappedToken: 'wxdai'
  },
  5: {
    unwrappedToken: 'gEth',
    wrappedToken: 'wgEth'
  },
  137: {
    unwrappedToken: 'Matic',
    wrappedToken: 'WMatic'
  }
};

export const blockExplorerBaseUrl = {
  1: 'https://etherscan.io/tx',
  100: 'https://gnosisscan.io/tx',
  5: 'https://goerli.etherscan.io/tx',
  137: 'https://polygonscan.com/tx'
};
