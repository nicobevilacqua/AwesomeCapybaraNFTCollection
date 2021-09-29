export const NETWORKS = {
  MAIN: {
    chainId: 1,
    name: 'Mainnet',
  },

  ROPSTEN: {
    chainId: 3,
    name: 'Ropsten',
  },

  RINKEBY: {
    chainId: 4,
    name: 'Rinkeby',
    params: {
      chainId: `0x${(4).toString(16)}`,
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrl: ['https://rinkeby.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://rinkeby.etherscan.com/'],
    },
  },

  LOCALHOST: {
    chainId: [31337, 1337],
    name: 'Localhost',
    params: {
      chainId: `0x${(1337).toString(16)}`,
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrl: ['https://rinkeby.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://rinkeby.etherscan.com/'],
    },
  },
};

export const TRANSACTION_ERROR_CODES = {
  REJECTED_BY_USER: 4001,
  PENDING: -32002,
};

export const ERRORS = {
  MISSING_METAMASK: 'METAMASK IS REQUIRED',
  TRANSACTION_FAILED: 'THE TRANSACTION HAS FAILED',
  TRANSACTION_REJECTED_BY_USER: 'TRANSACTION REJECTED',
  TRANSACTION_WAITING_FOR_APPOVAL: 'TRANSACTION WAITING FOR APROVAL',
  INVALID_NETWORK: 'INVALID NETWORK',
  DEFAULT: 'ERROR',
};

export const MESSAGES = {
  TRANSACTION_COMPLETED: 'TRANSACTION COMPLETED',
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};
