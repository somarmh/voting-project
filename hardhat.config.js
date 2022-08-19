/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.7.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/NT3DEeYSAfOQvhBuILt1by0P0deqhm16",
      accounts: [
        "4a2b212a7660800dd8cfa36a26b00ae1a8005c943cf73dc0b21f86e8e99682b2"
      ] // add your Ethereum key here (private key)
    },
  }
};
require('@nomiclabs/hardhat-waffle');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

