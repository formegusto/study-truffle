const Simple2 = artifacts.require("Simple2");
const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = chai;

contract("Test3", (accounts) => {
  it("Should not have zero address", async () => {
    const simpleInstance = await Simple2.deployed();
    await expect(simpleInstance.address).to.not.equal(0x0);
  });

  it("Should have 1 ether", async () => {
    const simpleInstance = await Simple2.deployed();
    console.log(accounts);

    // truffle 내에 web3가 있어서 선언안해줘도 된다.
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: simpleInstance.address,
      value: web3.utils.toWei("1", "ether"),
    });
    let balance = await web3.eth.getBalance(simpleInstance.address);
    expect(balance).to.be.a.bignumber.equal(
      new BN(web3.utils.toWei("1", "ether"))
    );
  });
});
