import React from 'react';
import { Wallet, BarChart3, Send, Settings, Shield, Code } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'send', label: 'Send', icon: Send },
    { id: 'developer', label: 'Developer', icon: Code },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-gray-900 border-r border-gray-800 w-64 h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wallet className="h-8 w-8 text-blue-500" />
          PersonalWallet
        </h1>
        <p className="text-gray-400 text-sm mt-1">Your crypto companion</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">YW</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Your Wallet</p>
              <p className="text-gray-400 text-xs">0x1234...5678</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;