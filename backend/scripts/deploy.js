const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory(
    "MockERC20"
  );

  const collateral = await Token.deploy(
    "Collateral",
    "COL",
    hre.ethers.parseEther("1000000")
  );

  await collateral.waitForDeployment();

  const borrow = await Token.deploy(
    "Borrow",
    "BRW",
    hre.ethers.parseEther("1000000")
  );

  await borrow.waitForDeployment();

  const Lending = await hre.ethers.getContractFactory(
    "LendingProtocol"
  );

  const lending = await Lending.deploy(
    collateral.target,
    borrow.target
  );

  await lending.waitForDeployment();
  await borrow.transfer(
  lending.target,
  hre.ethers.parseEther("100000")
);

  console.log(
    "Collateral Token:",
    collateral.target
  );

  console.log(
    "Borrow Token:",
    borrow.target
  );

  console.log(
    "Lending Protocol:",
    lending.target
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});