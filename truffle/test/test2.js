const Simple = artifacts.require("Simple");
const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = chai;

contract.only("Test2", (account) => {
  it.only("Should not have zero address", async () => {
    const simpleInstance = await Simple.deployed();
    await expect(simpleInstance.address).to.not.equal(0x0);
  });

  it.only("Should return 5", async () => {
    const simpleInstance = await Simple.deployed();
    const result = await simpleInstance.return5();

    // 연산
    const addNumber = new BN(4).add(new BN(1));
    await expect(result).to.be.bignumber.equal(addNumber);

    const subNumber = new BN(6).sub(new BN(1));
    await expect(result).to.be.bignumber.equal(subNumber);

    const mulNumber = new BN(5).mul(new BN(1));
    await expect(result).to.be.bignumber.equal(mulNumber);

    const divNumber = new BN(5).mul(new BN(1));
    await expect(result).to.be.bignumber.equal(divNumber);
  });

  it.only("Should return 55", async () => {
    const simpleInstance = await Simple.deployed();
    const result = await simpleInstance.returnParameter(55);
    console.log(new BN(5));

    await expect(result).to.be.bignumber.equal(new BN(55));
  });
});
