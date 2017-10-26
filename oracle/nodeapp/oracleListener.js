'use strict';
/*
OracleResolver4: 0x444078Aa15FE48B152245744cBD16023B2444C0e
OracleContract4: 0x08c152C90F2775915B1EBC88C218A9B86307A775
OracleApp4: 0x5074bf9892a1ce5be4126e53b8d7addc4b04f918
*/

var tx = 'http://13.92.177.20:8545';
var passpharse = 'Pwd=222222222';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var oracleContractAddress = '0x08c152C90F2775915B1EBC88C218A9B86307A775';//deployed contract checksum address
var clientContractAddress = '0xc3a486e2c58d8b3713af5848eb4303dc7e81946b';

web3.setProvider(new web3.providers.HttpProvider(tx));

//unlock accounts that we'll be using
web3.personal.unlockAccount(web3.eth.accounts[0],passpharse,30000);   //sender
web3.personal.unlockAccount(web3.eth.accounts[1],passpharse,30000);   //oracle

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
        //var result2 = cf3.UpdateContract.sendTransaction('newState',1,{from:web3.eth.accounts[0]});
        console.log('receipt=' + JSON.stringify(receipt));
    }
}

//configure Oracle callback address
var text = fs.readFileSync('./contracts/OracleContract4.json','utf8');
var oracleInterface = JSON.parse(text);
var oracle =  web3.eth.contract(oracleInterface.abi).at(oracleContractAddress);
//set callback address, this is the oracle account address, when oracle callback to our contract, the caller address must match address specified here
var hash = oracle.setCallbackAddress.sendTransaction(web3.eth.accounts[1],{from:web3.eth.accounts[1],gas:3000000}); //'0x1f83fa84c03a2f4e50be16947a3991cab6018376'
waitForTransactionReceipt(hash);

//convert clientContractAddress to checksum address
//clientContractAddress = web3.toChecksumAddress(clientContractAddress);

var queryEvent = oracle.QueryEvent();
console.log('watching for query event');

queryEvent.watch(function(err,result){
    if(!err){
        console.log('QueryEvent fired:' + JSON.stringify(result));
        //exact query parameters
        //var id = _.at(result, 'args.id');
        //var query = _.at(result,'args.query');
    }else{
        console.log('error=' + JSON.stringify(err));
    }
});

text = fs.readFileSync('./contracts/myClientContract4.json','utf8');
var myContractInterface = JSON.parse(text);
var myContract = web3.eth.contract(myContractInterface.abi).new({from:web3.eth.accounts[0],gas:3000000,data:myContractInterface.unlinked_binary});
