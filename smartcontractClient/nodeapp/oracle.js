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
web3.personal.unlockAccount(web3.eth.accounts[0],passpharse);   //sender
web3.personal.unlockAccount(web3.eth.accounts[1],passpharse);   //oracle

