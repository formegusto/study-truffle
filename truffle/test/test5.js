const Simple2 = artifacts.require("Simple2");
const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = chai;

contract("Test5", (accounts) => {
  it("Should not have zero address", async () => {
    const simpleInstance = await Simple2.deployed();
    await expect(simpleInstance.address).to.not.equal(0x0);
  });

  it("Should have 1 ether", async () => {
    const simpleInstance = await Simple2.deployed();
    // console.log(accounts);

    // truffle 내에 web3가 있어서 선언안해줘도 된다.
    const info1 = await simpleInstance.return99();
    // event, args 등이 출력되는 것을 확인할 수 있다.
    console.log(info1.logs);

    const info2 = await web3.eth.sendTransaction({
      from: accounts[0],
      to: simpleInstance.address,
      value: web3.utils.toWei("1", "ether"),
    });
    // 이거는 이벤트명이 나타나지 않는다. 왜냐하면
    // receive라는 함수는 이더를 보내는 함수인데,
    // 스마트 컨트랙에서 실행되는 함수가 아니기 때문이다.
    // accounts[0]이라는 주체에 의해서 실행된다.
    // 예전에 넘겨 넘겨 던져진 형태 기억나죠?
    console.log(info2.logs);

    let balance = await web3.eth.getBalance(simpleInstance.address);
    expect(balance).to.be.a.bignumber.equal(
      new BN(web3.utils.toWei("1", "ether"))
    );
  });
});
