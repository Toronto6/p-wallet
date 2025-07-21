import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)));

  // Deploy PersonalWallet
  console.log("\nDeploying PersonalWallet...");
  const PersonalWallet = await ethers.getContractFactory("PersonalWallet");
  const personalWallet = await PersonalWallet.deploy();
  await personalWallet.waitForDeployment();
  const personalWalletAddress = await personalWallet.getAddress();
  console.log("PersonalWallet deployed to:", personalWalletAddress);

  // Deploy TokenFactory
  console.log("\nDeploying TokenFactory...");
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  await tokenFactory.waitForDeployment();
  const tokenFactoryAddress = await tokenFactory.getAddress();
  console.log("TokenFactory deployed to:", tokenFactoryAddress);

  // Create a test token
  console.log("\nCreating test token...");
  const createTokenTx = await tokenFactory.createToken(
    "Personal Test Token",
    "PTT",
    18,
    1000000 // 1 million tokens
  );
  await createTokenTx.wait();
  
  const userTokens = await tokenFactory.getUserTokens(deployer.address);
  if (userTokens.length > 0) {
    console.log("Test token created at:", userTokens[0].tokenAddress);
  }

  console.log("\nDeployment completed!");
  console.log("=".repeat(50));
  console.log("PersonalWallet:", personalWalletAddress);
  console.log("TokenFactory:", tokenFactoryAddress);
  console.log("=".repeat(50));

  // Save deployment addresses
  const deploymentInfo = {
    network: await ethers.provider.getNetwork(),
    personalWallet: personalWalletAddress,
    tokenFactory: tokenFactoryAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\nDeployment Info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });