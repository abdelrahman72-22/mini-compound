# Mini Compound dApp

A decentralized lending and borrowing platform inspired by Compound Finance.

Users can deposit ERC20 collateral tokens and borrow other ERC20 tokens against their collateral using Ethereum smart contracts.

---

# Features

- Deposit ERC20 collateral
- Borrow ERC20 tokens
- Repay borrowed tokens
- Withdraw collateral
- MetaMask integration
- React frontend
- Hardhat smart contract development
- Ethers.js blockchain interaction
- Local blockchain testing
- Sepolia testnet deployment
- Slither security analysis

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

## Security Analysis

- Slither

---

# Project Structure

```bash
mini-compound/
│
├── backend/
│   ├── contracts/
│   │   ├── LendingProtocol.sol
│   │   └── MockERC20.sol
│   │
│   ├── scripts/
│   │   └── deploy.js
│   │
│   ├── test/
│   │   └── Lending.js
│   │
│   ├── hardhat.config.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── screenshots/
├── README.md
└── .gitignore
```

---

# Smart Contracts

## MockERC20.sol

ERC20 token used for testing.

Functions:

- mint()
- transfer()
- approve()
- transferFrom()

Used as:

- Collateral token
- Borrow token

---

## LendingProtocol.sol

Main lending protocol smart contract.

### Features

- Deposit collateral
- Borrow against collateral
- Repay loans
- Withdraw collateral

### Main Functions

#### depositCollateral()

Allows users to deposit collateral tokens into the protocol.

#### borrow()

Allows users to borrow tokens based on their collateral amount.

#### repay()

Repays borrowed tokens.

#### withdrawCollateral()

Allows users to withdraw collateral after repaying loans.

---

# Setup Instructions

## Prerequisites

Install the following:

- Node.js 22+
- npm
- Git
- MetaMask
- VS Code

---

# Backend Setup

## 1. Clone Repository

```bash
git clone https://github.com/abdelrahman72-22/mini-compound.git
```

---

## 2. Open Backend

```bash
cd mini-compound/backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Compile Contracts

```bash
npx hardhat compile
```

---

## 5. Run Tests

```bash
npx hardhat test
```

---

# Running Local Blockchain

Start Hardhat local blockchain:

```bash
npx hardhat node
```

This creates:

- Local Ethereum blockchain
- Test accounts
- Free ETH for testing

RPC URL:

```bash
http://127.0.0.1:8545
```

Chain ID:

```bash
31337
```

---

# Deploy Smart Contracts

Open a new terminal:

```bash
cd mini-compound/backend
```

Deploy contracts:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Example Output:

```bash
Collateral Token: 0x...
Borrow Token: 0x...
Lending Protocol: 0x...
```

---

# Frontend Setup

## 1. Open Frontend

```bash
cd mini-compound/frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Frontend

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

# MetaMask Setup

## Add Hardhat Local Network

Network Name:

```text
Hardhat Local
```

RPC URL:

```text
http://127.0.0.1:8545
```

Chain ID:

```text
31337
```

Currency Symbol:

```text
ETH
```

---

# Import Hardhat Account

Copy private key from:

```bash
npx hardhat node
```

Import it into MetaMask.

---

# Using the dApp

## Step 1

Connect MetaMask wallet.

---

## Step 2

Deposit collateral tokens.

---

## Step 3

Borrow tokens against collateral.

---

## Step 4

Repay borrowed tokens.

---

## Step 5

Withdraw collateral.

---

# Test Cases

The following test cases were implemented:

- Deposit collateral
- Borrow tokens
- Repay loan
- Withdraw collateral

Run tests:

```bash
npx hardhat test
```

---

# Security Analysis

Slither static analyzer was used to scan smart contracts.

Run Slither:

```bash
slither . --solc-remaps "@openzeppelin=node_modules/@openzeppelin"
```

Security improvements:

- Proper collateral checks
- Require validations
- ERC20 safe interaction
- Borrow limit enforcement

---

# Sepolia Deployment

The smart contracts were successfully deployed on Ethereum Sepolia testnet.

## Contract Addresses

### Collateral Token

```text
0x300638cE9030215d6AeE7558A1B4Aee667Aa4Ce4
```

### Borrow Token

```text
0x91E9B2FcD3cC9D8ca7636F92D3D99FBBBb569e1D
```

### Lending Protocol

```text
0x636a1AE0ba076F16A04e82F0A3f0a6b266b307E5
```

---

# Screenshots

Project screenshots are available in:

```bash
/screenshots
```

Includes:

- Frontend UI
- MetaMask integration
- Hardhat tests
- Slither analysis
- Transaction logs
- Deployments

---

# Future Improvements

Possible future upgrades:

- Interest rates
- Liquidation system
- Oracle integration
- Multiple collateral tokens
- Dynamic APY
- Compound-like governance

---

# Repository

GitHub Repository:

https://github.com/abdelrahman72-22/mini-compound
