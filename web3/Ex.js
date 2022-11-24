import Web3 from "web3";

const Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(Provider);

// get Accounts Test
(async function () {
  const accounts = await web3.eth.getAccounts();
  console.log("---getAccounts list---");
  console.log(accounts);
})();

// get Account and Balance
(async function () {
  const accounts = await web3.eth.getAccounts();
  console.log("---getAccounts and balances list---");

  accounts.forEach(async (account) => {
    const balnace = await web3.eth.getBalance(account);
    console.log(`account: ${account}, balance: ${balnace}`);
  });
})();

// Send Transaction
(async function () {
  console.log("---send transaction test---");
  const accounts = await web3.eth.getAccounts();

  let balance0 = await web3.eth.getBalance(accounts[0]);
  let balance1 = await web3.eth.getBalance(accounts[1]);

  console.log("before transaction");
  console.log(`account: ${accounts[0]}, balance: ${balance0}`);
  console.log(`account: ${accounts[1]}, balance: ${balance1}`);

  await web3.eth.sendTransaction({
    from: accounts[0],
    to: accounts[1],
    // value: 10 ** 18 * 5, // 5ether
    value: web3.utils.toWei("1", "ether"),
  });

  balance0 = await web3.eth.getBalance(accounts[0]);
  balance1 = await web3.eth.getBalance(accounts[1]);

  console.log("after transaction");
  console.log(`account: ${accounts[0]}, balance: ${balance0}`);
  console.log(`account: ${accounts[1]}, balance: ${balance1}`);
})();
