import React, { useState } from 'react';
import { Shield, Key, Eye, EyeOff, Download, Upload, RefreshCw } from 'lucide-react';

const Security: React.FC = () => {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const seedPhrase = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent',
    'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident'
  ];

  const securityFeatures = [
    {
      title: 'Seed Phrase Backup',
      description: 'Your 12-word recovery phrase',
      status: 'Secured',
      action: 'View',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Private Key Export',
      description: 'Export private key for advanced users',
      status: 'Available',
      action: 'Export',
      icon: Key,
      color: 'blue'
    },
    {
      title: 'Auto-lock Timer',
      description: 'Automatically lock wallet after inactivity',
      status: '15 minutes',
      action: 'Configure',
      icon: RefreshCw,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Security Center</h2>
        
        <div className="grid gap-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${feature.color}-500/20`}>
                    <Icon className={`h-5 w-5 text-${feature.color}-400`} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{feature.title}</p>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm mb-1">{feature.status}</p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    {feature.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seed Phrase Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recovery Phrase</h3>
          <button
            onClick={() => setShowSeedPhrase(!showSeedPhrase)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showSeedPhrase ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4 mb-4">
          <p className="text-red-200 text-sm">
            <strong>⚠️ Warning:</strong> Never share your seed phrase with anyone. 
            Store it in a secure location offline.
          </p>
        </div>

        {showSeedPhrase ? (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {seedPhrase.map((word, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded-lg">
                <span className="text-gray-400 text-xs">{index + 1}.</span>
                <p className="text-white font-mono">{word}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg text-center mb-4">
            <Shield className="h-12 w-12 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">Click "Show" to reveal your seed phrase</p>
          </div>
        )}

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            Download Backup
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Upload className="h-4 w-4" />
            Verify Backup
          </button>
        </div>
      </div>

      {/* Private Key Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Private Key Export</h3>
        
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-4">
          <p className="text-yellow-200 text-sm">
            <strong>⚠️ Advanced Feature:</strong> Only export your private key if you know what you're doing. 
            Private keys provide full access to your wallet.
          </p>
        </div>

        {showPrivateKey ? (
          <div className="space-y-3">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Private Key (hex):</p>
              <p className="text-white font-mono text-sm break-all">
                0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
              </p>
            </div>
            <button
              onClick={() => setShowPrivateKey(false)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Hide Private Key
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowPrivateKey(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Show Private Key
          </button>
        )}
      </div>
    </div>
  );
};

export default Security;