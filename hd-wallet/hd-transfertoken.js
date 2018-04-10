var from = '';
var mnemonic = '';
var to = '';
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if(index == 2){
        from = val;
    }else if(index == 3){
        mnemonic = val;
    }else if(index ==4){
        to = val;
    }
});
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

var metaCoin = new hdWeb3.eth.Contract(ABI.abi,METACOIN_ADDRESS,{from:hdProvider.address,gas:3000000});
console.log('sending coin...');

metaCoin.methods.sendCoin(to, 1).send({from:hdProvider.address,gas:3000000})
                .on('error', function(err){
                    console.log('error:' + err);
                })
                .on('transactionHash', function(hash){
                    console.log('hash:' + hash);
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    //console.log('confirmationNumber:' + confirmationNumber);
                })
                .on('receipt', function(receipt){
                    console.log('receipt:' + receipt);
                    console.log('balance:' + metaCoin.methods.metaCoin(from).call());                    
                });