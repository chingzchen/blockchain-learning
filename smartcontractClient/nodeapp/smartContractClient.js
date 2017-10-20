'use strict';
var tx = 'http://{TX Node IP}:8545';
var passpharse = '{Password}';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var address5 = '0x2ed795cdff952c6f00a34d6c3ca81344cfcf850bb838fa5a4fb28c72af9b7ef0';//deployed contract address
var text = fs.readFileSync('./contracts/ChickenFarmContract5.json','utf8');//truffle compile result


web3.setProvider(new web3.providers.HttpProvider(tx));

//unlock accounts that we'll be using
web3.personal.unlockAccount(web3.eth.accounts[0],passpharse);
//load contract
var contractInterface = JSON.parse(text);
//deploy the contract with constructor parameters, we need to supply gas so that the contract can be deployed
var cf3 = web3.eth.contract(contractInterface.abi).new('test123','test456',{from:web3.eth.accounts[0],data:contractInterface.unlinked_binary,gas:3000000});
//the contract will need to be mined, we get transaction hash here to check if it is mined
console.log('cf3.transactionHash:' + cf3.transactionHash);


function waitForTransactionReceipt(hash) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(hash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(hash);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        var result2 = cf3.UpdateContract.sendTransaction('newState',1,{from:web3.eth.accounts[0]});
        console.log('receipt=' + receipt);
        console.log('cf3=' + cf3);
        console.log('result=' + result2);
    }
}

//wait till transaciton mined
waitForTransactionReceipt(cf3.transactionHash);

