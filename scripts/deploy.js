const {ethers} = require('hardhat')

async function main() {
    const Election = await ethers.getContractFactory('Election');
    const election = await Election.deploy();
    console.log("Deployed to " + election.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });