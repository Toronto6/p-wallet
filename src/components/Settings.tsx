import React, { useState } from 'react';
import { Globe, Moon, Sun, Bell, Lock, Database, RefreshCw } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    currency: 'USD',
    language: 'en',
    notifications: true,
    autoLock: 15,
    rpcCustom: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
        
        <div className="space-y-6">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.theme === 'dark' ? (
                <Moon className="h-5 w-5 text-blue-400" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
              <div>
                <p className="text-white font-medium">Theme</p>
                <p className="text-gray-400 text-sm">Choose your preferred theme</p>
              </div>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Currency */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Currency</p>
                <p className="text-gray-400 text-sm">Default currency for display</p>
              </div>
            </div>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-gray-400 text-sm">Transaction and security alerts</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', !settings.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto Lock */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-white font-medium">Auto Lock</p>
                <p className="text-gray-400 text-sm">Lock wallet after inactivity</p>
              </div>
            </div>
            <select
              value={settings.autoLock}
              onChange={(e) => handleSettingChange('autoLock', parseInt(e.target.value))}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* Network Settings */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Network & RPC</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Custom RPC</p>
                <p className="text-gray-400 text-sm">Use custom RPC endpoints</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('rpcCustom', !settings.rpcCustom)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.rpcCustom ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.rpcCustom ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.rpcCustom && (
            <div className="space-y-3 pl-8">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Ethereum RPC URL</label>
                <input
                  type="url"
                  placeholder="https://mainnet.infura.io/v3/..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Polygon RPC URL</label>
                <input
                  type="url"
                  placeholder="https://polygon-rpc.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Advanced</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-3 bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-yellow-400" />
              <span className="text-white">Reset Wallet</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-blue-400" />
              <span className="text-white">Export Wallet Data</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">About</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Build</span>
            <span className="text-white">2025.01.27</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">License</span>
            <span className="text-white">Personal Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;