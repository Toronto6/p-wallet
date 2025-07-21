// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title PersonalWallet
 * @dev A personal smart contract wallet with advanced features
 */
contract PersonalWallet is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Events
    event EtherReceived(address indexed from, uint256 amount);
    event EtherSent(address indexed to, uint256 amount);
    event TokenSent(address indexed token, address indexed to, uint256 amount);
    event BatchTransactionExecuted(uint256 indexed batchId, uint256 transactionCount);
    event EmergencyWithdrawal(address indexed token, uint256 amount);

    // State variables
    mapping(address => bool) public authorizedSpenders;
    mapping(address => uint256) public spendingLimits;
    mapping(address => uint256) public dailySpent;
    mapping(address => uint256) public lastSpendingReset;
    
    uint256 public transactionCount;
    uint256 public batchCount;
    
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 timestamp;
    }
    
    mapping(uint256 => Transaction) public transactions;

    // Modifiers
    modifier onlyAuthorized() {
        require(msg.sender == owner() || authorizedSpenders[msg.sender], "Not authorized");
        _;
    }

    modifier withinSpendingLimit(address spender, uint256 amount) {
        if (spender != owner()) {
            _resetDailySpendingIfNeeded(spender);
            require(
                dailySpent[spender] + amount <= spendingLimits[spender],
                "Exceeds daily spending limit"
            );
            dailySpent[spender] += amount;
        }
        _;
    }

    constructor() {}

    // Receive function
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    // Fallback function
    fallback() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    /**
     * @dev Send Ether to a recipient
     */
    function sendEther(address payable to, uint256 amount) 
        external 
        onlyAuthorized 
        nonReentrant 
        withinSpendingLimit(msg.sender, amount) 
    {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");

        emit EtherSent(to, amount);
    }

    /**
     * @dev Send ERC20 tokens to a recipient
     */
    function sendToken(address token, address to, uint256 amount) 
        external 
        onlyAuthorized 
        nonReentrant 
    {
        require(token != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");

        IERC20(token).safeTransfer(to, amount);
        emit TokenSent(token, to, amount);
    }

    /**
     * @dev Execute a batch of transactions
     */
    function executeBatch(
        address[] calldata targets,
        uint256[] calldata values,
        bytes[] calldata data
    ) external onlyOwner nonReentrant {
        require(
            targets.length == values.length && values.length == data.length,
            "Array length mismatch"
        );

        uint256 currentBatchId = batchCount++;
        
        for (uint256 i = 0; i < targets.length; i++) {
            require(targets[i] != address(0), "Invalid target");
            
            (bool success, ) = targets[i].call{value: values[i]}(data[i]);
            require(success, "Transaction failed");
            
            transactionCount++;
        }

        emit BatchTransactionExecuted(currentBatchId, targets.length);
    }

    /**
     * @dev Add or remove authorized spender
     */
    function setAuthorizedSpender(address spender, bool authorized, uint256 dailyLimit) 
        external 
        onlyOwner 
    {
        require(spender != address(0), "Invalid spender address");
        
        authorizedSpenders[spender] = authorized;
        if (authorized) {
            spendingLimits[spender] = dailyLimit;
        } else {
            spendingLimits[spender] = 0;
            dailySpent[spender] = 0;
        }
    }

    /**
     * @dev Emergency withdrawal function
     */
    function emergencyWithdraw(address token) external onlyOwner {
        if (token == address(0)) {
            // Withdraw Ether
            uint256 balance = address(this).balance;
            require(balance > 0, "No Ether to withdraw");
            
            (bool success, ) = payable(owner()).call{value: balance}("");
            require(success, "Withdrawal failed");
            
            emit EmergencyWithdrawal(address(0), balance);
        } else {
            // Withdraw ERC20 token
            IERC20 tokenContract = IERC20(token);
            uint256 balance = tokenContract.balanceOf(address(this));
            require(balance > 0, "No tokens to withdraw");
            
            tokenContract.safeTransfer(owner(), balance);
            emit EmergencyWithdrawal(token, balance);
        }
    }

    /**
     * @dev Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get token balance
     */
    function getTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    /**
     * @dev Reset daily spending if 24 hours have passed
     */
    function _resetDailySpendingIfNeeded(address spender) internal {
        if (block.timestamp >= lastSpendingReset[spender] + 1 days) {
            dailySpent[spender] = 0;
            lastSpendingReset[spender] = block.timestamp;
        }
    }

    /**
     * @dev Get remaining daily spending limit
     */
    function getRemainingDailyLimit(address spender) external view returns (uint256) {
        if (spender == owner()) {
            return type(uint256).max;
        }
        
        if (block.timestamp >= lastSpendingReset[spender] + 1 days) {
            return spendingLimits[spender];
        }
        
        return spendingLimits[spender] > dailySpent[spender] 
            ? spendingLimits[spender] - dailySpent[spender] 
            : 0;
    }
}