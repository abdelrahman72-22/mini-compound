import { useState } from "react";
import { ethers } from "ethers";

const lendingAddress =
  "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

const collateralAddress =
  "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const borrowTokenAddress =
  "0x0165878A594ca255338adfa4d48449f69242Eb8F";

const lendingABI = [
  "function depositCollateral(uint256 amount) external",
  "function borrow(uint256 amount) external",
  "function repay(uint256 amount) external",
  "function withdrawCollateral(uint256 amount) external",
  "function collateralBalance(address) view returns (uint256)",
  "function borrowedBalance(address) view returns (uint256)"
];

const erc20ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

function App() {

  const [account, setAccount] = useState("");

  const [collateralBalance, setCollateralBalance] =
    useState("0");

  const [borrowedBalance, setBorrowedBalance] =
    useState("0");

  const [depositAmount, setDepositAmount] =
    useState("");

  const [borrowAmount, setBorrowAmount] =
    useState("");

  const [repayAmount, setRepayAmount] =
    useState("");

  const [withdrawAmount, setWithdrawAmount] =
    useState("");

  async function loadBalances(userAddress) {

    const provider =
      new ethers.BrowserProvider(window.ethereum);

    const lending =
      new ethers.Contract(
        lendingAddress,
        lendingABI,
        provider
      );

    const collateral =
      await lending.collateralBalance(userAddress);

    const borrowed =
      await lending.borrowedBalance(userAddress);

    setCollateralBalance(
      ethers.formatEther(collateral)
    );

    setBorrowedBalance(
      ethers.formatEther(borrowed)
    );
  }

  async function connectWallet() {

    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider =
      new ethers.BrowserProvider(window.ethereum);

    const accounts =
      await provider.send(
        "eth_requestAccounts",
        []
      );

    setAccount(accounts[0]);

    await loadBalances(accounts[0]);
  }

  async function deposit() {

    try {

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const collateral =
        new ethers.Contract(
          collateralAddress,
          erc20ABI,
          signer
        );

      const lending =
        new ethers.Contract(
          lendingAddress,
          lendingABI,
          signer
        );

      const amount =
        ethers.parseEther(depositAmount);

      const tx1 =
        await collateral.approve(
          lendingAddress,
          amount
        );

      await tx1.wait();

      const tx2 =
        await lending.depositCollateral(
          amount
        );

      await tx2.wait();

      await loadBalances(account);

      alert("Deposit success");

    } catch (error) {

      console.log(error);

      alert("Deposit failed");
    }
  }

  async function borrow() {

    try {

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const lending =
        new ethers.Contract(
          lendingAddress,
          lendingABI,
          signer
        );

      const amount =
        ethers.parseEther(borrowAmount);

      const tx =
        await lending.borrow(amount);

      await tx.wait();

      await loadBalances(account);

      alert("Borrow success");

    } catch (error) {

      console.log(error);

      alert("Borrow failed");
    }
  }

  async function repay() {

    try {

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const borrowToken =
        new ethers.Contract(
          borrowTokenAddress,
          erc20ABI,
          signer
        );

      const lending =
        new ethers.Contract(
          lendingAddress,
          lendingABI,
          signer
        );

      const amount =
        ethers.parseEther(repayAmount);

      const tx1 =
        await borrowToken.approve(
          lendingAddress,
          amount
        );

      await tx1.wait();

      const tx2 =
        await lending.repay(amount);

      await tx2.wait();

      await loadBalances(account);

      alert("Repay success");

    } catch (error) {

      console.log(error);

      alert("Repay failed");
    }
  }

  async function withdraw() {

    try {

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const lending =
        new ethers.Contract(
          lendingAddress,
          lendingABI,
          signer
        );

      const amount =
        ethers.parseEther(withdrawAmount);

      const tx =
        await lending.withdrawCollateral(
          amount
        );

      await tx.wait();

      await loadBalances(account);

      alert("Withdraw success");

    } catch (error) {

      console.log(error);

      alert("Withdraw failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Mini Compound
        </h1>

        <button
          onClick={connectWallet}
          style={buttonStyle}
        >
          Connect Wallet
        </button>

        <p
          style={{
            fontSize: "12px",
            marginTop: "10px",
            wordBreak: "break-all"
          }}
        >
          {account}
        </p>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            background: "#0f172a",
            padding: "15px",
            borderRadius: "10px"
          }}
        >
          <p>
            Collateral Balance:
            {" "}
            {collateralBalance}
          </p>

          <p>
            Borrowed Amount:
            {" "}
            {borrowedBalance}
          </p>
        </div>

        <input
          placeholder="Deposit Amount"
          value={depositAmount}
          onChange={(e) =>
            setDepositAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={deposit}
          style={buttonStyle}
        >
          Deposit Collateral
        </button>

        <input
          placeholder="Borrow Amount"
          value={borrowAmount}
          onChange={(e) =>
            setBorrowAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={borrow}
          style={buttonStyle}
        >
          Borrow Tokens
        </button>

        <input
          placeholder="Repay Amount"
          value={repayAmount}
          onChange={(e) =>
            setRepayAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={repay}
          style={buttonStyle}
        >
          Repay Loan
        </button>

        <input
          placeholder="Withdraw Amount"
          value={withdrawAmount}
          onChange={(e) =>
            setWithdrawAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={withdraw}
          style={buttonStyle}
        >
          Withdraw Collateral
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#3b82f6",
  color: "white",
  fontSize: "16px",
  cursor: "pointer"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none"
};

export default App;