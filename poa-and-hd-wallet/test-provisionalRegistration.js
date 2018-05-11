var CONFIG = require('./config.js');
var fs = require('fs');

const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');

var jsonString = fs.readFileSync('./build/contracts/ProvisionalRegistration.json','utf8');
var ABI = JSON.parse(jsonString);
var HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
var hdWeb3 = new Web3();

console.log('mnemonic:' + CONFIG.ADMIN_MNEMONIC());
console.log('TXNURL:' + CONFIG.TXNURL());
var hdProvider = new HDWalletProvider(CONFIG.ADMIN_MNEMONIC(), CONFIG.TXNURL(), 0);
hdWeb3.setProvider(hdProvider);

function LoadCertABI(path){
    var f = require('fs');
    var text = f.readFileSync(path,'utf8');
    var interface = JSON.parse(text);    
    return interface;
}

function LoadContract(web3, abi, address){
    return web3.eth.contract(abi).at(address);
}


var SHIP_NAME = 'Dwai Dwai';
var OFFICIAL_NO = "OFF_NO_001";
var IMO = 678918;
var HULL = 678918;
var OWNER_NAME = 'Ching Chen';
var CALL_SIGN = "Dandandandan";
var CLASS_SOCIETY = "SOCIETY";
var OWNER_ADDRESS = '8F, 7, ShunRen Rd, Taipei City, Taiwan.';
var DESIGNATION = 'CEO';
var HASH_STRING = "0x123";
var NAME_OF_SIGNATORY = 'Michael SH Chi';
var SHIPYARD_NAME = 'Dwai Dwai Shipyard';
var SHIPYARD_ADDRESS = '19F, 7 ShunRen Rd, Taipei City, Taiwan';
var SHIP_TYPE = 'CRUISE';
var CLASS_NAME = 'SUN CLASS';  
var CERT_NO = "CERTNO-001";
var LENGTH = 200;
var BREADTH = 20;
var DEPTH = 80;
//var metaCoin = new hdWeb3.eth.Contract(ABI.abi,METACOIN_ADDRESS,{from:hdProvider.address,gas:3000000});
var PR = new hdWeb3.eth.Contract(ABI.abi,CONFIG.ProvisionalRegistration(),{from:hdProvider.address,gas:3000000});// ({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});

var opt = {from:hdWeb3.eth.accounts[0], data: ABI.bytecode, gas:3000000};

console.log('creating new contract...');
/*
function NewProvisionalRegistration(uint imo, string certNo, string shipName, 
    uint length, uint breadth,
                                uint depth, string owner, uint issueDate, uint expiryDate) {
*/
var today = (new Date());
var ISSUE_DATE = today.getTime();
var EXPIRE_DATE = (new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() )).getTime();

PR.methods.NewProvisionalRegistration(IMO, CERT_NO, SHIP_NAME,
    LENGTH, BREADTH, DEPTH, OWNER_NAME, 
    ISSUE_DATE, EXPIRE_DATE
        ).send(opt)
        .then(function(receipt){
            console.log('receipt:' + JSON.stringify(receipt));
            PR.methods.GetInfo().call()
                            .then(function(result){
                                console.log('========================');
                                console.log(result);
                            });
        });
