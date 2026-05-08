# Mini Compound dApp

A decentralized lending and borrowing protocol inspired by Compound Finance.

Users can:
- Deposit ERC20 collateral
- Borrow tokens against collateral
- Repay borrowed tokens
- Withdraw collateral

---

# Tech Stack

## Smart Contracts
- Solidity
- Hardhat
- OpenZeppelin

## Frontend
- React
- Vite
- Ethers.js

## Wallet
- MetaMask

---

# Features

- ERC20 token lending
- Collateral-based borrowing
- Dynamic balances
- MetaMask integration
- Real blockchain transactions
- Responsive UI

---

# Smart Contracts

## MockERC20.sol
ERC20 token used for testing.

## LendingProtocol.sol
Core lending protocol contract.

Functions:
- depositCollateral()
- borrow()
- repay()
- withdrawCollateral()

---

# Installation

## Backend

```bash
cd backend

npm install

npx hardhat compile

npx hardhat test
```

## Start Local Node

```bash
npx hardhat node
```

## Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

# Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Usage

1. Connect MetaMask
2. Deposit collateral
3. Borrow tokens
4. Repay loan
5. Withdraw collateral

---

# Project Structure

```bash
mini-compound/
│
├── backend/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
│
├── frontend/
│   ├── src/
│   └── public/
```

---

# Testing

Smart contract tests were written using:
- Mocha
- Chai

Covered scenarios:
- Deposit collateral
- Borrow tokens
- Repay loan
- Withdraw collateral

---

# Security Notes

- Uses OpenZeppelin ERC20 implementation
- Requires collateral before borrowing
- Repayment required before full withdrawal

---

# Future Improvements

- Interest rates
- Liquidation system
- Multi-token support
- Oracle integration
- Compound-like APY

---

# Author

Developed as a DeFi lending protocol project using Solidity and React.
