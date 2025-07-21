import React, { useState } from 'react';
import { Copy, QrCode, Plus, MoreVertical, ExternalLink } from 'lucide-react';
import type { WalletAccount, Chain } from '../types/wallet';

interface WalletViewProps {
  accounts: WalletAccount[];
  chains: Chain[];
  activeChain: string;
  onChainChange: (chainId: string) => void;
}

const WalletView: React.FC<WalletViewProps> = ({
  accounts,
  chains,
  activeChain,
  onChainChange
}) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const activeChainData = chains.find(chain => chain.id === activeChain);
  const activeAccount = accounts.find(account => account.isActive);

  return (
    <div className="space-y-6">
      {/* Chain Selector */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Active Network</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => onChainChange(chain.id)}
              className={`p-3 rounded-lg border transition-all ${
                activeChain === chain.id
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium text-sm">{chain.name}</p>
                <p className="text-xs opacity-75">{chain.symbol}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Account */}
      {activeAccount && (
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Account Details</h3>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Account Name</label>
              <p className="text-white font-medium">{activeAccount.name}</p>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Address</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-white font-mono text-sm bg-gray-900 px-3 py-2 rounded flex-1">
                  {activeAccount.address}
                </p>
                <button
                  onClick={() => handleCopyAddress(activeAccount.address)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <QrCode className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
              {copiedAddress === activeAccount.address && (
                <p className="text-green-500 text-xs mt-1">Address copied!</p>
              )}
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Balance</label>
              <p className="text-white font-semibold text-lg">
                {parseFloat(activeAccount.balance).toFixed(4)} {activeChainData?.symbol}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account Management */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Accounts</h3>
          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <Plus className="h-4 w-4" />
            Add Account
          </button>
        </div>
        
        <div className="space-y-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`p-3 rounded-lg border transition-all ${
                account.isActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{account.name}</p>
                  <p className="text-gray-400 text-sm font-mono">
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {parseFloat(account.balance).toFixed(4)} {account.chain}
                  </p>
                  {account.isActive && (
                    <span className="text-blue-400 text-xs">Active</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors">
          Receive
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors">
          Send
        </button>
      </div>
    </div>
  );
};

export default WalletView;