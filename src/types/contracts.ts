export interface ContractDeployment {
  address: string;
  network: string;
  deployedAt: Date;
  verified: boolean;
  abi: any[];
}

export interface SmartContract {
  name: string;
  address: string;
  abi: any[];
  bytecode: string;
  network: string;
  isDeployed: boolean;
  deploymentTx?: string;
}

export interface DeploymentConfig {
  network: string;
  gasLimit: string;
  gasPrice: string;
  constructorArgs: any[];
}

export interface CompilationResult {
  success: boolean;
  contracts: {
    [contractName: string]: {
      abi: any[];
      bytecode: string;
      metadata: any;
    };
  };
  errors: string[];
  warnings: string[];
}

export interface TestResult {
  passed: number;
  failed: number;
  total: number;
  coverage: number;
  details: {
    testName: string;
    status: 'passed' | 'failed';
    duration: number;
    error?: string;
  }[];
}

export interface FoundryProject {
  name: string;
  path: string;
  contracts: SmartContract[];
  tests: string[];
  scripts: string[];
  lastCompiled: Date;
  lastTested: Date;
}

export interface HardhatTask {
  name: string;
  description: string;
  params: {
    name: string;
    type: string;
    description: string;
    optional: boolean;
  }[];
}