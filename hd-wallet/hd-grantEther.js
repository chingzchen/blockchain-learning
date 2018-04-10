var from = '';
var mnemonic = '';
var to = '';
console.log('=== Please check if your funding account has sufficient ehter ===');

from = process.argv[2];
mnemonic = process.argv[3];
to = process.argv[4];
console.log('from:'+ from);
console.log('mnemonic:'+mnemonic);
console.log('to:'+ to);

if(!from || ! mnemonic || !to){
    console.error('requires [account], [mnemonic] and [to]');
    return;
}

// Import libraries we need.
var txnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');
var fs = require('fs');
var jsonString = fs.readFileSync('../build/contracts/MetaCoin.json','utf8');
var ABI = JSON.parse(jsonString);
var METACOIN_ADDRESS = '0xdc41410ec91df27d824cfd161f80fddfff674181';
var HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
var hdWeb3 = new Web3();
console.log('mnemonic:' + mnemonic);
var hdProvider = new HDWalletProvider(mnemonic, txnUrl, 0);
hdWeb3.setProvider(hdProvider);
console.log('address:' + hdProvider.address);

hdWeb3.eth.sendTransaction({from:from, to:to, value:1000000, gas:3000000})
            .on('transactionHash', function(hash){
                console.log('hash:' + hash);
            })
            .on('receipt', function(receipt){
                console.log('got receipt');
                hdWeb3.eth.getBalance(from)
                            .then(console.log);
                hdWeb3.eth.getBalance(to)
                            .then(console.log);                
            })
            .on('confirmation', function(confirmationNumber, receipt){})
            .on('error', console.error);


