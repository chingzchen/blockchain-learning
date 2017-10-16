'use strict';
var tx = 'http://{tx node ip}:8545';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider(tx));//, 0, BasicAuthUsername, BasicAuthPassword));

web3.personal.unlockAccount(web3.eth.accounts[0],'{pass}');
var text = fs.readFileSync('./contracts/SimpleContract.json','utf8');
var contractInterface = JSON.parse(text);
var address = '0x75e394b64d531c1c81ca8734d127dd30d1ab7d4a';

//var cf3 = web3.eth.contract(contractInterface.abi).new('test123','test456',{from:web3.eth.accounts[0],data:contractInterface.unlinked_binary,gas:3000000});
var contract = web3.eth.contract(contractInterface.abi).at(address);
console.log(contract.address);//0x75e394b64d531c1c81ca8734d127dd30d1ab7d4a
contract.UpdateExchangeRate(123);
contract.exchangeRate.call();//123

var contract2 = web3.eth.contract(contractInterface.abi).at(address);
contract2.exchangeRate.call();//123

var contract3 = web3.eth.contract(contractInterface.abi).new({from:web3.eth.accounts[0],data:contractInterface.unlinked_binary,gas:3000000});
contract3.exchangeRate.call();//0
