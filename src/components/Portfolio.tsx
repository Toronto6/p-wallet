import React from 'react';
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import type { Portfolio as PortfolioType, Token } from '../types/wallet';

interface PortfolioProps {
  portfolio: PortfolioType;
  isBalanceVisible: boolean;
  onToggleBalance: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ 
  portfolio, 
  isBalanceVisible, 
  onToggleBalance 
}) => {
  const formatValue = (value: string) => {
    if (!isBalanceVisible) return '••••••';
    return `$${parseFloat(value).toLocaleString()}`;
  };

  const formatBalance = (balance: string, symbol: string) => {
    if (!isBalanceVisible) return '••••••';
    return `${parseFloat(balance).toFixed(4)} ${symbol}`;
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Total Balance</h2>
          <button
            onClick={onToggleBalance}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isBalanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold text-white">
            {formatValue(portfolio.totalValue)}
          </p>
          <div className="flex items-center gap-2">
            {portfolio.change24h >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              portfolio.change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {portfolio.change24h >= 0 ? '+' : ''}{portfolio.change24h.toFixed(2)}% (24h)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
          Buy Crypto
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
          Swap
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors">
          Stake
        </button>
      </div>

      {/* Token List */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Assets</h3>
        <div className="space-y-3">
          {portfolio.tokens.map((token, index) => (
            <TokenRow key={index} token={token} isBalanceVisible={isBalanceVisible} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TokenRow: React.FC<{ token: Token; isBalanceVisible: boolean }> = ({ 
  token, 
  isBalanceVisible 
}) => {
  const formatBalance = (balance: string, symbol: string) => {
    if (!isBalanceVisible) return '••••••';
    return `${parseFloat(balance).toFixed(4)} ${symbol}`;
  };

  const formatValue = (value: string) => {
    if (!isBalanceVisible) return '••••••';
    return `$${parseFloat(value).toLocaleString()}`;
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
        </div>
        <div>
          <p className="text-white font-medium">{token.name}</p>
          <p className="text-gray-400 text-sm">{token.symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-white font-medium">
          {formatBalance(token.balance, token.symbol)}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-gray-400 text-sm">{formatValue(token.value)}</p>
          <span className={`text-xs ${
            token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;