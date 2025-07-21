export interface WalletAccount {
  id: string;
  name: string;
  address: string;
  balance: string;
  chain: string;
  isActive: boolean;
}

export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  change24h: number;
  address?: string;
  decimals?: number;
  logoUrl?: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  amount: string;
  token: string;
  to: string;
  from: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  fee: string;
  chain: string;
}

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  logoUrl: string;
  isTestnet: boolean;
}

export interface Portfolio {
  totalValue: string;
  change24h: number;
  tokens: Token[];
  charts: {
    labels: string[];
    values: number[];
  };
}