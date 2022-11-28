const Simple2 = artifacts.require("Simple2");
const { chai, BN } = require("./setUp");
const { expect } = chai;

contract("Test6", (accounts) => {
  it("Should not have zero address", async () => {
    const simpleInstance = await Simple2.deployed();
    await expect(simpleInstance.address).to.not.equal(0x0);
  });

  it("Should have 1 ether", async () => {
    const simpleInstance = await Simple2.deployed();
    const info1 = await simpleInstance.return99();

    await expect(
      web3.eth.sendTransaction({
        from: accounts[0],
        to: simpleInstance.address,
        value: web3.utils.toWei("10000", "ether"),
      })
    ).to.be.rejected;

    await expect(
      web3.eth.sendTransaction({
        from: accounts[0],
        to: simpleInstance.address,
        value: web3.utils.toWei("1", "ether"),
      })
    ).to.be.fulfilled;

    // let balance = await web3.eth.getBalance(simpleInstance.address);
    expect(
      web3.eth.getBalance(simpleInstance.address)
    ).to.eventually.be.bignumber.equal(new BN(web3.utils.toWei("1", "ether")));
  });
});
