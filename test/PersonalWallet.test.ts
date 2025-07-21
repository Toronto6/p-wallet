import { expect } from "chai";
import { ethers } from "hardhat";
import { PersonalWallet, SimpleToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("PersonalWallet", function () {
  let personalWallet: PersonalWallet;
  let testToken: SimpleToken;
  let owner: SignerWithAddress;
  let spender: SignerWithAddress;
  let recipient: SignerWithAddress;

  beforeEach(async function () {
    [owner, spender, recipient] = await ethers.getSigners();

    // Deploy PersonalWallet
    const PersonalWallet = await ethers.getContractFactory("PersonalWallet");
    personalWallet = await PersonalWallet.deploy();
    await personalWallet.waitForDeployment();

    // Deploy test token
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    testToken = await SimpleToken.deploy(
      "Test Token",
      "TEST",
      18,
      1000000,
      owner.address
    );
    await testToken.waitForDeployment();

    // Send some ETH to the wallet
    await owner.sendTransaction({
      to: await personalWallet.getAddress(),
      value: ethers.parseEther("10")
    });

    // Send some tokens to the wallet
    await testToken.transfer(await personalWallet.getAddress(), ethers.parseEther("1000"));
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await personalWallet.owner()).to.equal(owner.address);
    });

    it("Should receive Ether", async function () {
      const balance = await personalWallet.getBalance();
      expect(balance).to.equal(ethers.parseEther("10"));
    });
  });

  describe("Ether Transfers", function () {
    it("Should allow owner to send Ether", async function () {
      const amount = ethers.parseEther("1");
      const initialBalance = await ethers.provider.getBalance(recipient.address);

      await personalWallet.sendEther(recipient.address, amount);

      const finalBalance = await ethers.provider.getBalance(recipient.address);
      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it("Should not allow unauthorized users to send Ether", async function () {
      const amount = ethers.parseEther("1");
      
      await expect(
        personalWallet.connect(spender).sendEther(recipient.address, amount)
      ).to.be.revertedWith("Not authorized");
    });

    it("Should enforce spending limits for authorized spenders", async function () {
      const dailyLimit = ethers.parseEther("2");
      const amount = ethers.parseEther("3");

      // Authorize spender with daily limit
      await personalWallet.setAuthorizedSpender(spender.address, true, dailyLimit);

      // Try to spend more than limit
      await expect(
        personalWallet.connect(spender).sendEther(recipient.address, amount)
      ).to.be.revertedWith("Exceeds daily spending limit");
    });
  });

  describe("Token Transfers", function () {
    it("Should allow owner to send tokens", async function () {
      const amount = ethers.parseEther("100");
      const initialBalance = await testToken.balanceOf(recipient.address);

      await personalWallet.sendToken(await testToken.getAddress(), recipient.address, amount);

      const finalBalance = await testToken.balanceOf(recipient.address);
      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it("Should get token balance", async function () {
      const balance = await personalWallet.getTokenBalance(await testToken.getAddress());
      expect(balance).to.equal(ethers.parseEther("1000"));
    });
  });

  describe("Batch Transactions", function () {
    it("Should execute batch transactions", async function () {
      const targets = [recipient.address, recipient.address];
      const values = [ethers.parseEther("1"), ethers.parseEther("2")];
      const data = ["0x", "0x"];

      const initialBalance = await ethers.provider.getBalance(recipient.address);

      await personalWallet.executeBatch(targets, values, data);

      const finalBalance = await ethers.provider.getBalance(recipient.address);
      expect(finalBalance - initialBalance).to.equal(ethers.parseEther("3"));
    });
  });

  describe("Emergency Functions", function () {
    it("Should allow emergency withdrawal of Ether", async function () {
      const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
      const walletBalance = await personalWallet.getBalance();

      await personalWallet.emergencyWithdraw(ethers.ZeroAddress);

      const finalWalletBalance = await personalWallet.getBalance();
      expect(finalWalletBalance).to.equal(0);
    });

    it("Should allow emergency withdrawal of tokens", async function () {
      const initialOwnerBalance = await testToken.balanceOf(owner.address);
      const walletBalance = await personalWallet.getTokenBalance(await testToken.getAddress());

      await personalWallet.emergencyWithdraw(await testToken.getAddress());

      const finalOwnerBalance = await testToken.balanceOf(owner.address);
      expect(finalOwnerBalance - initialOwnerBalance).to.equal(walletBalance);
    });
  });
});