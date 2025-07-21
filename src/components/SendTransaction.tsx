import React, { useState } from 'react';
import { ArrowRight, Scan, BookOpen, AlertTriangle } from 'lucide-react';
import type { Token, Chain } from '../types/wallet';

interface SendTransactionProps {
  tokens: Token[];
  chains: Chain[];
  activeChain: string;
}

const SendTransaction: React.FC<SendTransactionProps> = ({
  tokens,
  chains,
  activeChain
}) => {
  const [selectedToken, setSelectedToken] = useState(tokens[0]?.symbol || '');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isMax, setIsMax] = useState(false);

  const activeChainData = chains.find(chain => chain.id === activeChain);
  const selectedTokenData = tokens.find(token => token.symbol === selectedToken);

  const handleMaxAmount = () => {
    if (selectedTokenData) {
      setAmount(selectedTokenData.balance);
      setIsMax(true);
    }
  };

  const estimatedFee = '0.0021';
  const estimatedTotal = parseFloat(amount || '0') + parseFloat(estimatedFee);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Send Transaction</h2>
        
        {/* Token Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Select Token</label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.name} ({token.symbol}) - {parseFloat(token.balance).toFixed(4)}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Address */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Recipient Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x... or ENS name"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors">
                <Scan className="h-5 w-5" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors">
                <BookOpen className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setIsMax(false);
                }}
                placeholder="0.00"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 pr-20 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleMaxAmount}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                MAX
              </button>
            </div>
            {selectedTokenData && (
              <p className="text-gray-400 text-sm mt-1">
                Available: {parseFloat(selectedTokenData.balance).toFixed(4)} {selectedToken}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Transaction Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Network</span>
            <span className="text-white">{activeChainData?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="text-white">{amount || '0'} {selectedToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Fee</span>
            <span className="text-white">{estimatedFee} {activeChainData?.symbol}</span>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-semibold">
                {estimatedTotal.toFixed(4)} {selectedToken}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      {amount && parseFloat(amount) > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-200 font-medium">Double-check recipient address</p>
              <p className="text-yellow-300 text-sm mt-1">
                Transactions on the blockchain are irreversible. Make sure the recipient address is correct.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Send Button */}
      <button
        disabled={!recipient || !amount || parseFloat(amount) <= 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
      >
        Send Transaction
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SendTransaction;