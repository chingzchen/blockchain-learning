// Import libraries we need.
var CONFIG = require('./config.js');
//var txnUrl = 'http://m0922xjuu.eastus.cloudapp.azure.com:8545';
console.log(CONFIG.TXNURL());
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');
var mnemonic =  generateMnemonic() ; // 12 word mnemonic
const wallet = EthHdWallet.fromMnemonic(mnemonic);

console.log('mnemonic:' + mnemonic);
//generate address
var to = wallet.generateAddresses(1)[0];
console.log(to);
console.log('account created, grant Ether...');

console.log('=== Please check if your funding account has sufficient ehter ===');
var hdkey = require('ethereumjs-wallet/hdkey');
var bip39 = require("bip39");
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
var wallet_hdpath = "m/44'/60'/0'/0/";
var ADDRESS_INDEX = 0;
var wallet2 = hdwallet.derivePath(wallet_hdpath + ADDRESS_INDEX).getWallet();
var key = wallet2.getPrivateKey().toString('hex');
console.log('private key:' + key);