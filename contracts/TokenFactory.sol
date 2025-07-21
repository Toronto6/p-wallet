// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleToken
 * @dev A simple ERC20 token for testing
 */
contract SimpleToken is ERC20, Ownable {
    uint8 private _decimals;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(owner, initialSupply * 10**decimals_);
        _transferOwnership(owner);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}

/**
 * @title TokenFactory
 * @dev Factory contract for creating ERC20 tokens
 */
contract TokenFactory {
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint8 decimals,
        uint256 initialSupply,
        address indexed owner
    );

    struct TokenInfo {
        address tokenAddress;
        string name;
        string symbol;
        uint8 decimals;
        uint256 initialSupply;
        address owner;
        uint256 createdAt;
    }

    mapping(address => TokenInfo[]) public userTokens;
    TokenInfo[] public allTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) external returns (address) {
        SimpleToken newToken = new SimpleToken(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );

        TokenInfo memory tokenInfo = TokenInfo({
            tokenAddress: address(newToken),
            name: name,
            symbol: symbol,
            decimals: decimals,
            initialSupply: initialSupply,
            owner: msg.sender,
            createdAt: block.timestamp
        });

        userTokens[msg.sender].push(tokenInfo);
        allTokens.push(tokenInfo);

        emit TokenCreated(
            address(newToken),
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );

        return address(newToken);
    }

    function getUserTokens(address user) external view returns (TokenInfo[] memory) {
        return userTokens[user];
    }

    function getAllTokens() external view returns (TokenInfo[] memory) {
        return allTokens;
    }

    function getTokenCount() external view returns (uint256) {
        return allTokens.length;
    }
}