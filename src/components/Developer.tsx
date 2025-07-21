import React, { useState } from 'react';
import { 
  Code, 
  Play, 
  Upload, 
  Download, 
  Terminal, 
  FileText, 
  Zap, 
  CheckCircle, 
  XCircle,
  Hammer,
  TestTube,
  Rocket
} from 'lucide-react';

const Developer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const contracts = [
    {
      name: 'PersonalWallet.sol',
      status: 'compiled',
      size: '2.4 KB',
      lastModified: '2 hours ago',
      deployed: true,
      address: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba2507'
    },
    {
      name: 'TokenFactory.sol',
      status: 'compiled',
      size: '1.8 KB',
      lastModified: '3 hours ago',
      deployed: true,
      address: '0x123456789abcdef123456789abcdef123456789a'
    },
    {
      name: 'SimpleToken.sol',
      status: 'modified',
      size: '1.2 KB',
      lastModified: '1 hour ago',
      deployed: false,
      address: null
    }
  ];

  const testResults = [
    { name: 'PersonalWallet.test.ts', status: 'passed', tests: 12, duration: '2.3s' },
    { name: 'TokenFactory.test.ts', status: 'passed', tests: 8, duration: '1.8s' },
    { name: 'Integration.test.ts', status: 'failed', tests: 5, duration: '0.9s' }
  ];

  const deployments = [
    {
      network: 'Localhost',
      personalWallet: '0x742d35Cc6634C0532925a3b8D34aAC7fb90ba2507',
      tokenFactory: '0x123456789abcdef123456789abcdef123456789a',
      status: 'active'
    },
    {
      network: 'Sepolia',
      personalWallet: '0x987654321fedcba987654321fedcba987654321f',
      tokenFactory: '0xabcdef1234567890abcdef1234567890abcdef12',
      status: 'verified'
    }
  ];

  const handleCompile = async () => {
    setIsCompiling(true);
    // Simulate compilation
    setTimeout(() => setIsCompiling(false), 3000);
  };

  const handleTest = async () => {
    setIsTesting(true);
    // Simulate testing
    setTimeout(() => setIsTesting(false), 5000);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => setIsDeploying(false), 8000);
  };

  const renderContracts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Smart Contracts</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Hammer className="h-4 w-4" />
            {isCompiling ? 'Compiling...' : 'Compile'}
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {contracts.map((contract, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">{contract.name}</p>
                  <p className="text-gray-400 text-sm">
                    {contract.size} • {contract.lastModified}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  contract.status === 'compiled' 
                    ? 'bg-green-900 text-green-300'
                    : contract.status === 'modified'
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-red-900 text-red-300'
                }`}>
                  {contract.status}
                </span>
                {contract.deployed && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-900 text-blue-300">
                    Deployed
                  </span>
                )}
              </div>
            </div>
            {contract.address && (
              <div className="mt-3 p-2 bg-gray-900 rounded text-xs font-mono text-gray-300">
                {contract.address}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Test Suite</h3>
        <div className="flex gap-2">
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <TestTube className="h-4 w-4" />
            {isTesting ? 'Running...' : 'Run Tests'}
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            <FileText className="h-4 w-4" />
            Coverage
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium">Test Results</h4>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">✓ 20 passed</span>
            <span className="text-red-400">✗ 1 failed</span>
            <span className="text-gray-400">21 total</span>
          </div>
        </div>

        <div className="space-y-3">
          {testResults.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded">
              <div className="flex items-center gap-3">
                {test.status === 'passed' ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <span className="text-white">{test.name}</span>
              </div>
              <div className="text-right text-sm text-gray-400">
                <p>{test.tests} tests • {test.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Coverage Report</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Statements</span>
            <span className="text-white">95.2%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95.2%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeployment = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Deployments</h3>
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Rocket className="h-4 w-4" />
          {isDeploying ? 'Deploying...' : 'Deploy'}
        </button>
      </div>

      <div className="space-y-3">
        {deployments.map((deployment, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{deployment.network}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                deployment.status === 'active' 
                  ? 'bg-green-900 text-green-300'
                  : 'bg-blue-900 text-blue-300'
              }`}>
                {deployment.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">PersonalWallet:</span>
                <p className="text-white font-mono text-xs mt-1 p-2 bg-gray-900 rounded">
                  {deployment.personalWallet}
                </p>
              </div>
              <div>
                <span className="text-gray-400">TokenFactory:</span>
                <p className="text-white font-mono text-xs mt-1 p-2 bg-gray-900 rounded">
                  {deployment.tokenFactory}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConsole = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Development Console</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
            <Terminal className="h-3 w-3" />
            Hardhat
          </button>
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
            <Zap className="h-3 w-3" />
            Foundry
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
        <div className="text-green-400 mb-2">$ npx hardhat compile</div>
        <div className="text-gray-300 mb-2">Compiling 3 files with 0.8.19</div>
        <div className="text-gray-300 mb-2">Compilation finished successfully</div>
        <div className="text-green-400 mb-2">$ npx hardhat test</div>
        <div className="text-gray-300 mb-2">PersonalWallet</div>
        <div className="text-green-400 mb-1">  ✓ Should set the right owner</div>
        <div className="text-green-400 mb-1">  ✓ Should receive Ether</div>
        <div className="text-green-400 mb-2">  ✓ Should allow owner to send Ether</div>
        <div className="text-gray-300 mb-2">21 passing (4.2s)</div>
        <div className="text-blue-400">$ forge build</div>
        <div className="text-gray-300">Compiling...</div>
        <div className="text-green-400">Success.</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Quick Commands</h4>
          <div className="space-y-2 text-sm">
            <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
              npx hardhat compile
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
              npx hardhat test
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
              npx hardhat run scripts/deploy.ts
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
              forge build
            </button>
            <button className="w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
              forge test
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Network Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Local Node</span>
              <span className="text-green-400">Running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Chain ID</span>
              <span className="text-white">31337</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Block Number</span>
              <span className="text-white">1,234,567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gas Price</span>
              <span className="text-white">20 gwei</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'contracts', label: 'Contracts', icon: Code },
    { id: 'testing', label: 'Testing', icon: TestTube },
    { id: 'deployment', label: 'Deploy', icon: Rocket },
    { id: 'console', label: 'Console', icon: Terminal },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-gray-800 rounded-xl p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 rounded-xl p-6">
        {activeTab === 'contracts' && renderContracts()}
        {activeTab === 'testing' && renderTesting()}
        {activeTab === 'deployment' && renderDeployment()}
        {activeTab === 'console' && renderConsole()}
      </div>
    </div>
  );
};

export default Developer;