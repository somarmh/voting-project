const { expect } = require('chai')
const { ethers } = require('hardhat')

describe("Testing the Election Contract", function () {
    this.timeout(60000);
    let Election;
    let election;
    /*
    it("should set the admin when deploying", async () => {
        Election = await ethers.getContractFactory("Election");
        election = await Election.deploy();
        const [signer] = await ethers.getSigners();
        console.log("Your contract is deployed! Here is its address " + election.address);
        console.log(signer.address);
        let admin = await election.admin();
        //console.log(admin.address);
        expect(admin).to.equal(signer.address);
    });
    
    it("should add candidates", async () => {
        Election = await ethers.getContractFactory("Election");
        election = await Election.deploy();
        const [admin, otherAccount] = await ethers.getSigners();
        console.log(admin.address);
        console.log(otherAccount.address);
        election.connect(otherAccount).addCandidate("somar" , "vote me!");
        //let candidateCount = await election.candidateCount();
        let candidateDetails = await election.candidateDetails(0);
        //console.log(candidateCount);
        console.log(candidateDetails);
        //expect(candidateCount).to.equal(1);
        //console.log(otherAccount.address);
    });
    
    it("should set the election details", async () => {
        Election = await ethers.getContractFactory("Election");
        election = await Election.deploy();
        election.setElectionDetails("name","email","etitle","otitle","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
        electionDetails = await election.electionDetails();
        organizer = await election.organizer();
        console.log(electionDetails);
        console.log(organizer);
    });
*/
    it("Final test", async () => {
        Election = await ethers.getContractFactory("Election");
        election = await Election.deploy();
        const [admin , organizer , voter1 , voter2 , voter3 , v1 , v2, v3] = await ethers.getSigners();
        election.setElectionDetails("name" , "adminEmail" , "adminTitle" , "electiontitle" , "organizationtitle" , organizer.address);
        election.addCandidate("somar" , "vote me!");
        election.addCandidate("hadi" , "vote me please!");
        //setSigniturePublicKey
        await election.connect(voter1).registerAsVoter('voter1','123','123');
        await election.connect(voter2).registerAsVoter('voter2','123','123'); 
        await election.connect(voter3).registerAsVoter('voter3','123','123');
        await election.connect(organizer).verifyVoter(true,voter1.address);
        await election.connect(organizer).verifyVoter(true,voter2.address);
        await election.connect(organizer).verifyVoter(true,voter3.address);
        let blindedvote1 = '3b2993815f8c90b4bd41998851568422';
        let blindedvote2 = '67a0e09f6d124b5fdf112cacf40f34c8';
        let blindedvote3 = '4e1b030af7b6321ea63d0d18cfec88c5';
        let secretKey1 = '4735746be0c14908412352550c4af33b4d2fa2625d0f6661b43e6a001ebe8fac';
        let secretKey2 = '3698deb25f471c5d8a1a328ace90468a812482444283e9a4d4e9c77e26cdf111';
        let secretKey3 = '9a8930b20f99d2591c57527b584e2aeaf203e711772acf93ad5947ca6a2895b8';
        await election.connect(voter1).requestBlindSig(blindedvote1);
        await election.connect(voter2).requestBlindSig(blindedvote2); 
        await election.connect(voter3).requestBlindSig(blindedvote3);
        //console.log(await election.Voters(voter1.address));
        let signiture1 = 'EiFLc+YxjIYkYT489S/9JvgB1gn/t6XtF8UjXC1UjOG1XutssCHZHJ7KPbM5/0vRp9hNWuXqUNztrvTmB5Xu5WemIjchKn7LEi3XHCo33wOiMWTQv4KfJPs/HUypa7Zlh/ew3yj/2PADHliWViHBfkRNdTy/pYDjuzoFQqva48wJOTijw3MTAAt0sXHFI8pBKwI6A5Yk8q3PwkS9rRzksFvEupuTksr0qhYJjhdpem0v8vnpvftEXMUg49CZflV5m0dqoE5KYbjnYLTedVaHFPY0zLpkyS56NoR5gvYnCMnnc6AVWp3y44reLwfzMD29xz/NJn1s/SoImBMkh5tSfw==';
        let signiture2 = 'mK1USUYcw09plq89SijWpjc4f5DwcKFRCM72uR4SQubYp1fjw3W9WpfKNuBUx83lSvmcprcM5TZcIZwFRc/fwYaui1VpCEt13Q9uEvZbTuylTHLyNFv/GyytH0FLGPBhsAM5b1s/ldeiBs8wuOgw/WicQqMxOSTQMvgNXn1oSWWDnubptj3reJdLzdtV75ArLo9lugcXSu2akOQtmZuytwzJBQqNtVit2MWR8GGf4cQWTv7AT3BQKS2+vbVdQwP7uMlwz3m8VEC1/NV4uIiuaV0kVkAw6CF6N4IwXiikPeJXrd1S6jBrnBTA1ZDYARt/AWjfYY0N8u/fTFkn5fsRSA==';
        let signiture3 = 'biV8zIaGzkU1fnIy3s7VEhDQ1Iulik47rade8DZ49JOWLZS87gbJ17UDEMzLcyLB8GbkUYkaucuEd8+x//5rbu9/YFVdBrnaZr8/LuwWhVA1RYcAaczJN8iUjSY0k1X+bHT3B0V6OOIAbsIhJsdEXkH5XHueG1cnA8drD1OdKzUrMVZTqkWC2MVGxWctKV36ZiYPgEIDk6Zbjp6aMTbmUfk0hmeHsvK80ZnhaVFUiIXGmWH1oZRuAD/buVFA7irl1FritOyAe9Tl+2u/dH3bRkjK21oEZ9a7lFBNM6767bu/xuc+UsNP6NgV8hFSiLbEOpkgSh9wmST9/XC+GI1dMQ==';
        await election.connect(organizer).writeBlindSig(voter1.address,signiture1);
        await election.connect(organizer).writeBlindSig(voter1.address,signiture2);
        await election.connect(organizer).writeBlindSig(voter1.address,signiture3);
        await election.connect(v1).vote(1 , secretKey1 , signiture1);
        await election.connect(v2).vote(1 , secretKey2 , signiture2);
        await election.connect(v3).vote(2 , secretKey3 , signiture3);
        //console.log(await election.Ballots(0));
        let publicKey = "-----BEGIN RSA PUBLIC KEY----- \
        MIIBCgKCAQEAzypYGph9MI1V0JXRkISmXzI36kIfbbb6WuC05jbszo6gsB5/zZrX \
        UyayC/x7bSab25nS+jZqX3P/6otQGicYBMG+TrW49BnHIgxRS9VBIQi9/sS008XC \
        hpSywhO4e9f4ZGK2iyQvd7gWCTqYhnk4MlMHeRFX1Hwlb4RMLEBdVUMk6yZkBKXU \
        tZoTPQjUlQ1LYdc+s4/B/jkg9Qd4Z4F3TJmr6zTWWU1lrxp3mNkjEGYGJRJdcNL6 \
        U43zccy7n7EkUrcSWN607ntoOkuD9Ud5U2UI5+FyjlsBcuQLeF48/pSzrD/g4XD+ \
        b8Tdfg56PrR8Rd/+MMiG+JLs4XZsK+P+kwIDAQAB \
        -----END RSA PUBLIC KEY-----";
        await election.connect(organizer).setSigniturePublicKey(publicKey);
        await election.connect(organizer).validBallots(signiture1 , 1);
    });
})
/*
public key fot orgnizer
public key:  
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAzypYGph9MI1V0JXRkISmXzI36kIfbbb6WuC05jbszo6gsB5/zZrX
UyayC/x7bSab25nS+jZqX3P/6otQGicYBMG+TrW49BnHIgxRS9VBIQi9/sS008XC
hpSywhO4e9f4ZGK2iyQvd7gWCTqYhnk4MlMHeRFX1Hwlb4RMLEBdVUMk6yZkBKXU
tZoTPQjUlQ1LYdc+s4/B/jkg9Qd4Z4F3TJmr6zTWWU1lrxp3mNkjEGYGJRJdcNL6
U43zccy7n7EkUrcSWN607ntoOkuD9Ud5U2UI5+FyjlsBcuQLeF48/pSzrD/g4XD+
b8Tdfg56PrR8Rd/+MMiG+JLs4XZsK+P+kwIDAQAB
-----END RSA PUBLIC KEY-----

private key:  -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzypYGph9MI1V0JXRkISmXzI36kIfbbb6WuC05jbszo6gsB5/
zZrXUyayC/x7bSab25nS+jZqX3P/6otQGicYBMG+TrW49BnHIgxRS9VBIQi9/sS0
08XChpSywhO4e9f4ZGK2iyQvd7gWCTqYhnk4MlMHeRFX1Hwlb4RMLEBdVUMk6yZk
BKXUtZoTPQjUlQ1LYdc+s4/B/jkg9Qd4Z4F3TJmr6zTWWU1lrxp3mNkjEGYGJRJd
cNL6U43zccy7n7EkUrcSWN607ntoOkuD9Ud5U2UI5+FyjlsBcuQLeF48/pSzrD/g
4XD+b8Tdfg56PrR8Rd/+MMiG+JLs4XZsK+P+kwIDAQABAoIBACnQdjAID1y5alTL
qJzu6VXVoQubhRR0Flw5dsnw1CNtDmn9/fXWBxg1e0KIF7GUVWkhxz/Rs+7ITyNc
MzLUKTjskij47Pf4LAVnTxFrXdX5GcBOm+ESzYy0ftBFgrscgHpiok27ZAlaEriS
Jy8dUIZ3085P/dZZqIS1w1o7M5t9sPQu4AC2UwJuAmH+iVNxwUP0wGqGktCsTDI1
t1dM40sVk3Pvp6OVcaRNN/i9a+7N6DpYL7HP0hi9IECyuLfYGxCEwU0Ldnqmgvx8
W7N91Wq+RjNHCHyaszYJQU/0UXUME+keQzDm0SnFz19n1qgEkjQeEhTZ0VODgyEJ
5bz6+2ECgYEA7nyu3FXfGncMFLcOJYsC3nCO3x/vfj6HPqXbjrcN09dVevneI4Fq
i9phta1IEjpMMoHBKoyPpyHHLD6m7gOb0+IIkb3olg95NMNnCN8alISfHTwXxvtX
FKSUegTAC3sdd7nPOD+UhWxVKGk2N7GvvWkQHtnrjwcL8i06B2SHYl0CgYEA3mDY
hekFqyJvPwHR5qjoMiduh7CY9kZA2Klleh6amo5ohofYD8B8pNkAW58ibn/7z0xM
b+5CKmNB67PnJlnhZGZ3gURmiAhTwtma29qdvgNrQN8CplE7M1BGmd23tj93/WAX
FmsD1dGGmVg1RMxu/RaOQyTHo2JgiDOirZE8ta8CgYEAgFe/LrpTv4VTjg5ZYaDm
4ViHutIP68uwsulFOA+RNHENAopXnpn2Ad97d+8R+yU+fmvPzZspb9NAwbHR2gM9
KBDbdbtS4PbgzqFd4KtYPZcFnhEJ5r66RVSwxt2pkEQoPpdTSj0FK6x6Q64jTGOm
ZPOWhlPWbfln12O5d+ME7M0CgYAkLZFMR9q6OsHqeDtT0UrlTfD3dk2MU2WdWgG+
WlhAqMZsjJEkDua4Uu1x+nO5kmy/DuSomRR+nONOm1gRrzGyCdGLYDtmCiTGYGyH
NAvRq/C4/w8JS9HbyUWTJrUKm0zEFevro8Fd+dZyAB26cZ/k4NSIK+WmuQyHXA8t
OaGs1QKBgQCgFK8DFyJhup9l/UYYGjormpjVm+a1BVH3dMYXXiZwZ/tVmk/PMls8
vYaY7JLJdQhtMSUL++0yPF9p5xAKX25opWs/aq1Fxl7O7mxpvZ3uG9Ir/EmjEUyh
WlHhdV9CGiDbHweDWLDZzHWjVRvFaRvKxeSmsev5Tpd9zfc+cCTW+g==
-----END RSA PRIVATE KEY-----

siniture1      EiFLc+YxjIYkYT489S/9JvgB1gn/t6XtF8UjXC1UjOG1XutssCHZHJ7KPbM5/0vRp9hNWuXqUNztrvTmB5Xu5WemIjchKn7LEi3XHCo33wOiMWTQv4KfJPs/HUypa7Zlh/ew3yj/2PADHliWViHBfkRNdTy/pYDjuzoFQqva48wJOTijw3MTAAt0sXHFI8pBKwI6A5Yk8q3PwkS9rRzksFvEupuTksr0qhYJjhdpem0v8vnpvftEXMUg49CZflV5m0dqoE5KYbjnYLTedVaHFPY0zLpkyS56NoR5gvYnCMnnc6AVWp3y44reLwfzMD29xz/NJn1s/SoImBMkh5tSfw==
siniture2      mK1USUYcw09plq89SijWpjc4f5DwcKFRCM72uR4SQubYp1fjw3W9WpfKNuBUx83lSvmcprcM5TZcIZwFRc/fwYaui1VpCEt13Q9uEvZbTuylTHLyNFv/GyytH0FLGPBhsAM5b1s/ldeiBs8wuOgw/WicQqMxOSTQMvgNXn1oSWWDnubptj3reJdLzdtV75ArLo9lugcXSu2akOQtmZuytwzJBQqNtVit2MWR8GGf4cQWTv7AT3BQKS2+vbVdQwP7uMlwz3m8VEC1/NV4uIiuaV0kVkAw6CF6N4IwXiikPeJXrd1S6jBrnBTA1ZDYARt/AWjfYY0N8u/fTFkn5fsRSA==
siniture3      biV8zIaGzkU1fnIy3s7VEhDQ1Iulik47rade8DZ49JOWLZS87gbJ17UDEMzLcyLB8GbkUYkaucuEd8+x//5rbu9/YFVdBrnaZr8/LuwWhVA1RYcAaczJN8iUjSY0k1X+bHT3B0V6OOIAbsIhJsdEXkH5XHueG1cnA8drD1OdKzUrMVZTqkWC2MVGxWctKV36ZiYPgEIDk6Zbjp6aMTbmUfk0hmeHsvK80ZnhaVFUiIXGmWH1oZRuAD/buVFA7irl1FritOyAe9Tl+2u/dH3bRkjK21oEZ9a7lFBNM6767bu/xuc+UsNP6NgV8hFSiLbEOpkgSh9wmST9/XC+GI1dMQ==







secretKey for each voter
voter3     9a8930b20f99d2591c57527b584e2aeaf203e711772acf93ad5947ca6a2895b8
encrypted >>>>>> 4e1b030af7b6321ea63d0d18cfec88c5
decrypted >>>>>> 2

voter2     3698deb25f471c5d8a1a328ace90468a812482444283e9a4d4e9c77e26cdf111
encrypted >>>>>> 67a0e09f6d124b5fdf112cacf40f34c8
decrypted >>>>>> 1

voter1     4735746be0c14908412352550c4af33b4d2fa2625d0f6661b43e6a001ebe8fac
encrypted >>>>>> 3b2993815f8c90b4bd41998851568422
decrypted >>>>>> 1
*/