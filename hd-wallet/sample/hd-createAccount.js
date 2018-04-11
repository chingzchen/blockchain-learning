// Import libraries we need.
var txnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');
var mnemonic =  generateMnemonic() ; // 12 word mnemonic
const wallet = EthHdWallet.fromMnemonic(mnemonic);

console.log('mnemonic:' + mnemonic);
//generate address
var from = wallet.generateAddresses(1)[0];
console.log(from);
return;