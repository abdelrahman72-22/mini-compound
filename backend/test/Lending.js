const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lending Protocol", function () {

  let collateral;
  let borrow;
  let lending;

  let owner;
  let user;

  beforeEach(async function () {

    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockERC20");

    collateral = await Token.deploy(
      "Collateral",
      "COL",
      ethers.parseEther("1000000")
    );

    borrow = await Token.deploy(
      "Borrow",
      "BRW",
      ethers.parseEther("1000000")
    );

    const Lending = await ethers.getContractFactory(
      "LendingProtocol"
    );

    lending = await Lending.deploy(
      collateral.target,
      borrow.target
    );

    await borrow.transfer(
      lending.target,
      ethers.parseEther("100000")
    );

    await collateral.transfer(
      user.address,
      ethers.parseEther("1000")
    );
  });

  it("Should deposit collateral", async function () {

    await collateral.connect(user)
      .approve(
        lending.target,
        ethers.parseEther("100")
      );

    await lending.connect(user)
      .depositCollateral(
        ethers.parseEther("100")
      );

    expect(
      await lending.collateralBalance(user.address)
    ).to.equal(ethers.parseEther("100"));
  });

  it("Should borrow token", async function () {

    await collateral.connect(user)
      .approve(
        lending.target,
        ethers.parseEther("150")
      );

    await lending.connect(user)
      .depositCollateral(
        ethers.parseEther("150")
      );

    await lending.connect(user)
      .borrow(
        ethers.parseEther("50")
      );

    expect(
      await lending.borrowedBalance(user.address)
    ).to.equal(ethers.parseEther("50"));
  });

  it("Should repay loan", async function () {

    await collateral.connect(user)
      .approve(
        lending.target,
        ethers.parseEther("150")
      );

    await lending.connect(user)
      .depositCollateral(
        ethers.parseEther("150")
      );

    await lending.connect(user)
      .borrow(
        ethers.parseEther("50")
      );

    await borrow.connect(user)
      .approve(
        lending.target,
        ethers.parseEther("50")
      );

    await lending.connect(user)
      .repay(
        ethers.parseEther("50")
      );

    expect(
      await lending.borrowedBalance(user.address)
    ).to.equal(0);
  });

});