var mnemonic = '';
mnemonic = process.argv[2];
console.log('mnemonic:' + mnemonic);
// Import libraries we need.
var txnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');
const wallet = EthHdWallet.fromMnemonic(mnemonic);

//generate address
var from = wallet.generateAddresses(1)[0];
console.log(from);
return;
