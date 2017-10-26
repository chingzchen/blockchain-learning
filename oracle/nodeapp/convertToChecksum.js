
var tx = 'http://{TXNODE IP}:8545';
var passpharse = '{Password}';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var oracleContractAddress = '0x08c152C90F2775915B1EBC88C218A9B86307A775';//deployed contract checksum address
var clientContractAddress = '0xc3a486e2c58d8b3713af5848eb4303dc7e81946b';

web3.setProvider(new web3.providers.HttpProvider(tx));

//unlock accounts that we'll be using
web3.personal.unlockAccount(web3.eth.accounts[0],passpharse,30000);   //sender

var checksum = web3.toChecksumAddress(oracleContractAddress);