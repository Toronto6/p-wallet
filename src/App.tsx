import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Portfolio from './components/Portfolio';
import WalletView from './components/WalletView';
import SendTransaction from './components/SendTransaction';
import Security from './components/Security';
import Settings from './components/Settings';
import Developer from './components/Developer';
import { 
  mockPortfolio, 
  mockAccounts, 
  mockChains,
  mockTokens 
} from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [activeChain, setActiveChain] = useState('ethereum');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleChainChange = (chainId: string) => {
    setActiveChain(chainId);
  };

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <Portfolio
            portfolio={mockPortfolio}
            isBalanceVisible={isBalanceVisible}
            onToggleBalance={handleToggleBalance}
          />
        );
      case 'wallet':
        return (
          <WalletView
            accounts={mockAccounts}
            chains={mockChains}
            activeChain={activeChain}
            onChainChange={handleChainChange}
          />
        );
      case 'send':
        return (
          <SendTransaction
            tokens={mockTokens}
            chains={mockChains}
            activeChain={activeChain}
          />
        );
      case 'developer':
        return <Developer />;
      case 'security':
        return <Security />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Portfolio
            portfolio={mockPortfolio}
            isBalanceVisible={isBalanceVisible}
            onToggleBalance={handleToggleBalance}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;