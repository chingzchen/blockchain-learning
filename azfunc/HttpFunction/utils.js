const Web3 = require('web3');
var HDWalletProvider = require("truffle-hdwallet-provider");
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');
var fs = require('fs');
var TxnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';
var METACOIN_ADDRESS = '0xdc41410ec91df27d824cfd161f80fddfff674181';
var jsonString = "";
try{
    jsonString = fs.readFileSync('/home/site/wwwroot/HttpFunction/MetaCoin.json','utf8');
    console.log(jsonString);
}catch{
    console.log('*** unable to read /home/site/wwwroot/HttpFunction/MetaCoin.json');
}

try{
    jsonString = fs.readFileSync('./HttpFunction/MetaCoin.json','utf8');
    console.log(jsonString);
}catch{
    console.log('*** unable to read ./HttpFunction/MetaCoin.json');
}



var ABI = JSON.parse(jsonString);

module.exports = function () {
    this.hdProvider = null;
    this.hdWeb3 = new Web3();
    this.metaCoin = null;

    this.initHDWallet = function (mnemonic) {
        console.log('mnemonic:' + mnemonic);
        this.hdProvider = new HDWalletProvider(mnemonic, TxnUrl, 0);
        this.hdWeb3.setProvider(this.hdProvider);
        console.log('address:' + this.hdProvider.address);
        this.metaCoin = new this.hdWeb3.eth.Contract(ABI.abi,METACOIN_ADDRESS,{from:this.hdProvider.address,gas:3000000});
        console.log('util initialized');
    }

    this.init = function () {
        //console.log('mnemonic:' + mnemonic);
        this.hdProvider = new this.hdWeb3.providers.HttpProvider(TxnUrl)
        this.hdWeb3.setProvider(this.hdProvider);
        this.metaCoin = new this.hdWeb3.eth.Contract(ABI.abi,METACOIN_ADDRESS);
        console.log('util initialized');
    }
}