const Simple3 = artifacts.require("Simple3");
const {
  BN,
  constants,
  expectEvent, // true일 때 테스트 통과
  expectRevert, // fail 일  때 테스트 통과
  time,
} = require("@openzeppelin/test-helpers");
const { chai } = require("./setUp");
const { expect } = chai;

contract.only("Test8", (accounts) => {
  let simpleInstance;

  beforeEach(async () => {
    // migration 에서 들고오는 것이기 때문에 매개변수 X
    // simpleInstance = await Simple3.deployed();
    simpleInstance = await Simple3.new(55);
  });

  it("Should not have zero address", async () => {
    // await expect(simpleInstance.address).to.not.equal(0x0);
    await expect(simpleInstance.address).to.not.equal(constants.ZERO_ADDRESS);
  });
  it("Should return 5", async () => {
    // await expect(simpleInstance.address).to.not.equal(0x0);
    expect(await simpleInstance.return5()).to.be.bignumber.equal(new BN("5"));
  });
  it("Only True", async () => {
    let info = await simpleInstance.noFalse(true);
    expectEvent(info, "OnlyTrue", {
      resultTrue: true,
    });
  });
  it("No False!", async () => {
    expectRevert(simpleInstance.noFalse(false), "No False!");
  });

  // ganache 켜져 있어야 함
  it.only("should return 5 as 10 mins is passed", async () => {
    await time.increase(3600);
    expect(await simpleInstance.return5In10mins()).to.be.bignumber.equal(
      new BN("5")
    );
  });
  it.only("should not return 5 as 10 mins is not passed yet", async () => {
    expectRevert(
      simpleInstance.return5In10mins(),
      "10 mins is not passed yet!"
    );
  });
});
