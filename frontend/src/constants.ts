export const NETWORKS = {
  MAIN: {
    chainId: 1,
    name: 'Mainnet',
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
  MISSING_METAMASK: 'Metamask is required.',
  TRANSACTION_FAILED: 'The transaction has failed.',
  TRANSACTION_REJECTED_BY_USER: 'Transaction rejected.',
  TRANSACTION_WAITING_FOR_APPOVAL: 'Transaction waiting for aproval.',
  INVALID_NETWORK: 'Invalid network',
  DEFAULT: 'An error has happended.',
};

export const MESSAGES = {
  TRANSACTION_COMPLETED: 'Transaction completed.',
};

export enum ALERT_TYPES {
  SUCCESS,
  ERROR,
  WARNING,
}
