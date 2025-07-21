import type { Portfolio, Token, Transaction, WalletAccount, Chain } from '../types/wallet';

export const mockTokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '2.5647',
    value: '8245.67',
    change24h: 3.42,
    decimals: 18,
    logoUrl: ''
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '1250.00',
    value: '1250.00',
    change24h: 0.01,
    decimals: 6,
    address: '0xa0b86a33e6f4e8b44e42b913dc22c9c60c0b8729',
    logoUrl: ''
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    balance: '8532.45',
    value: '7829.35',
    change24h: -2.15,
    decimals: 18,
    logoUrl: ''
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    balance: '125.75',
    value: '1486.23',
    change24h: 5.67,
    decimals: 18,
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    logoUrl: ''
  }
];

export const mockPortfolio: Portfolio = {
  totalValue: '18811.25',
  change24h: 2.34,
  tokens: mockTokens,
  charts: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [15000, 16500, 14800, 17200, 18000, 18811]
  }
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: 'receive',
    amount: '0.5',
    token: 'ETH',
    to: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba',
    from: '0x123456789abcdef123456789abcdef123456789a',
    timestamp: new Date(Date.now() - 3600000),
    status: 'confirmed',
    fee: '0.0021',
    chain: 'ethereum'
  },
  {
    id: '2',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: 'send',
    amount: '250.00',
    token: 'USDC',
    to: '0x987654321fedcba987654321fedcba987654321f',
    from: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba',
    timestamp: new Date(Date.now() - 7200000),
    status: 'confirmed',
    fee: '0.0015',
    chain: 'ethereum'
  },
  {
    id: '3',
    hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    type: 'swap',
    amount: '1000.00',
    token: 'MATIC',
    to: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba',
    from: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba',
    timestamp: new Date(Date.now() - 86400000),
    status: 'pending',
    fee: '0.008',
    chain: 'polygon'
  }
];

export const mockAccounts: WalletAccount[] = [
  {
    id: '1',
    name: 'Main Account',
    address: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba2507',
    balance: '2.5647',
    chain: 'ETH',
    isActive: true
  },
  {
    id: '2',
    name: 'Trading Account',
    address: '0x123456789abcdef123456789abcdef123456789a',
    balance: '0.8432',
    chain: 'ETH',
    isActive: false
  },
  {
    id: '3',
    name: 'Polygon Account',
    address: '0x987654321fedcba987654321fedcba987654321f',
    balance: '8532.45',
    chain: 'MATIC',
    isActive: false
  }
];

export const mockChains: Chain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    logoUrl: '',
    isTestnet: false
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    logoUrl: '',
    isTestnet: false
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    logoUrl: '',
    isTestnet: false
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    logoUrl: '',
    isTestnet: false
  }
];