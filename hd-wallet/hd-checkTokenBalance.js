var from = '';
var mnemonic = ''; // 12 word mnemonic
const BASE_ADDRESS = '0x7265e3b863b7e1b5125eefd1746b00e4b886174f';
process.argv.forEach(function (val, index, array) {
    if(index == 2){
        from = val;
    }else if(index == 3){
        mnemonic = val;
    }
});

console.log(from);
console.log(mnemonic);

if(!from || ! mnemonic){
    console.error('requires [account] and [mnemonic]');
    return;
}

// Import libraries we need.
var txnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';

var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');
var jsonString = fs.readFileSync('../build/contracts/MetaCoin.json','utf8');
var ABI = JSON.parse(jsonString);
var METACOIN_ADDRESS = '0xdc41410ec91df27d824cfd161f80fddfff674181';
web3.setProvider(new web3.providers.HttpProvider(txnUrl));

var metaCoin = new web3.eth.Contract(ABI.abi,METACOIN_ADDRESS);
metaCoin.methods.getBalance(from).call()
    .then(function(result){
        console.log('balance:' + result);
    });

