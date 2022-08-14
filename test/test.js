const { expect } = require('chai')
const { ethers } = require('hardhat')

describe("Testing the Election Contract", function () {
    this.timeout(60000);
    let Election;
    let election;
    it("should set the admin when deploying", async () => {
        Election = await ethers.getContractFactory("Election");
        election = await Election.deploy();
        const [signer] = await ethers.getSigners();
        console.log("Your contract is deployed! Here is its address " + election.address);
        console.log(signer.address);
        let admin = await election.admin();
        //console.log(admin.address);
        expect(admin).to.equal(signer.address);
    })
})