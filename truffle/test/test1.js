const Simple = artifacts.require("Simple");

contract("Test1", (accounts) => {
  it("Should not have zero address", async () => {
    const simpleInstance = await Simple.deployed();
    console.log(simpleInstance);
    await assert.notEqual(simpleInstance.address, 0x0);
  });

  it("Should return 5", async () => {
    const simpleInstance = await Simple.deployed();
    const result = await simpleInstance.return5();
    await assert.equal(result, 5);
  });

  it("Should return 55", async () => {
    const simpleInstance = await Simple.deployed();
    const result = await simpleInstance.returnParameter(55);
    await assert.equal(result, 55);
  });
});
