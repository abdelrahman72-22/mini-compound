// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LendingProtocol {

    IERC20 public collateralToken;
    IERC20 public borrowToken;

    uint256 public collateralRatio = 150;

    mapping(address => uint256) public collateralBalance;
    mapping(address => uint256) public borrowedBalance;

    constructor(
        address _collateralToken,
        address _borrowToken
    ) {
        collateralToken = IERC20(_collateralToken);
        borrowToken = IERC20(_borrowToken);
    }

    function depositCollateral(uint256 amount) external {

        require(amount > 0, "Amount must be > 0");

        collateralToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        collateralBalance[msg.sender] += amount;
    }

    function borrow(uint256 amount) external {

        require(amount > 0, "Amount must be > 0");

        uint256 maxBorrow =
            (collateralBalance[msg.sender] * 100)
            / collateralRatio;

        require(
            borrowedBalance[msg.sender] + amount <= maxBorrow,
            "Not enough collateral"
        );

        borrowedBalance[msg.sender] += amount;

        borrowToken.transfer(msg.sender, amount);
    }

    function repay(uint256 amount) external {

        require(amount > 0);

        borrowToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );

        borrowedBalance[msg.sender] -= amount;
    }

    function withdrawCollateral(uint256 amount) external {

        require(
            collateralBalance[msg.sender] >= amount,
            "Insufficient collateral"
        );

        uint256 remaining =
            collateralBalance[msg.sender] - amount;

        uint256 requiredCollateral =
            (borrowedBalance[msg.sender] * collateralRatio)
            / 100;

        require(
            remaining >= requiredCollateral ||
            borrowedBalance[msg.sender] == 0,
            "Loan still active"
        );

        collateralBalance[msg.sender] -= amount;

        collateralToken.transfer(msg.sender, amount);
    }
}