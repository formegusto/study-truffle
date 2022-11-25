const Simple2 = artifacts.require("Simple2");
const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = chai;

contract.skip("Test4", (accounts) => {
  it("Should not have zero address", async () => {
    const simpleInstance = await Simple2.deployed();
    await expect(simpleInstance.address).to.not.equal(0x0);
  });

  it("Should have 1 ether", async () => {
    const simpleInstance = await Simple2.deployed();
    // console.log(accounts);

    // truffle 내에 web3가 있어서 선언안해줘도 된다.
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: simpleInstance.address,
      value: web3.utils.toWei("1", "ether"),
    });
    // 모든 이벤트
    // 그 중에서도 0번째 블럭부터 최근 블럭까지!

    await web3.eth.sendTransaction({
      from: accounts[1],
      to: simpleInstance.address,
      value: web3.utils.toWei("2", "ether"),
    });

    await web3.eth.sendTransaction({
      from: accounts[2],
      to: simpleInstance.address,
      value: web3.utils.toWei("3", "ether"),
    });

    await web3.eth.sendTransaction({
      from: accounts[2],
      to: simpleInstance.address,
      value: web3.utils.toWei("4", "ether"),
    });

    await simpleInstance.return99();

    // const info = await simpleInstance.getPastEvents("allEvents", {
    //   fromBlock: 0,
    //   toBlock: "latest",
    // });
    console.log(accounts[2]);
    const info = await simpleInstance.getPastEvents("Receive", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        from: accounts[2],
      },
    });
    console.log(info);
    /*
    [
        {
            address: '0x9FBDa871d559710256a2502A2517b794B482Db40',
            blockHash: '0x1f98d5e68860fe6fd69991a5d4c6f1f2e2ce3fc9bff584c6c029d52acbf6e022',
            blockNumber: 8,
            logIndex: 0,
            removed: false,
            transactionHash: '0x51ba0738e85ffe78c052d458dfaba10bc60bfa42eecf3c8ac418ac1658bb8a3e',
            transactionIndex: 0,
            id: 'log_3e068175',
            returnValues: Result {
            '0': '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
            '1': '1000000000000000000',
            from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
            amount: '1000000000000000000'
            },
            event: 'Receive',
            signature: '0xd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def3',
            raw: {
            data: '0x000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef570000000000000000000000000000000000000000000000000de0b6b3a7640000',
            topics: [Array]
            },
            args: Result {
            '0': '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
            '1': [BN],
            __length__: 2,
            from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
            amount: [BN]
            }
        }
        ]
    */

    let balance = await web3.eth.getBalance(simpleInstance.address);
    expect(balance).to.be.a.bignumber.equal(
      new BN(web3.utils.toWei("1", "ether"))
    );
  });
});
