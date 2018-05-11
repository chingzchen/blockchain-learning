var CONFIG = require('./config.js');
var fs = require('fs');

const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet');

var jsonString = fs.readFileSync('./build/contracts/Vessel.json','utf8');
var ABI = JSON.parse(jsonString);
var VESSEL_BASE_ADDRESS = CONFIG.Vessel();
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
var GT = '200';
var NT = '200';

//var metaCoin = new hdWeb3.eth.Contract(ABI.abi,METACOIN_ADDRESS,{from:hdProvider.address,gas:3000000});
var vessel = new hdWeb3.eth.Contract(ABI.abi,VESSEL_BASE_ADDRESS,{from:hdProvider.address,gas:3000000});// ({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});

var opt = {from:hdWeb3.eth.accounts[0], data: ABI.bytecode, gas:3000000};

console.log('creating new contract...');

vessel.methods.NewBuilderCert(IMO).send(opt)
        .then(function(receipt){
            console.log('receipt:' + JSON.stringify(receipt));
            vessel.methods.GetBuildCert(IMO).call()
                            .then(function(result){
                                var BUILDER_ADDRESS = result;
                                console.log('Bulder Address:' + BUILDER_ADDRESS);
                                var abi = LoadCertABI('./build/contracts/BuilderCert.json');
                                var builder = new hdWeb3.eth.Contract(abi.abi,BUILDER_ADDRESS,{from:hdProvider.address,gas:3000000});
                                console.log('Requesting Builder Cert...');
                                var hash = builder.methods.RequestBuilderCert(SHIP_NAME,
                                        IMO,
                                        OFFICIAL_NO,
                                        OWNER_NAME,
                                        OWNER_ADDRESS,
                                        CALL_SIGN,
                                        CLASS_SOCIETY,
                                        HASH_STRING).send(opt)
                                    .then(function(r){
                                        console.log('======================================');
                                        builder.methods.NameOfShip().call().then(console.log);
                                        builder.methods.IMO().call().then(console.log);
                                        builder.methods.OfficialNo().call().then(console.log);
                                        builder.methods.ShipownerName().call().then(console.log);
                                        builder.methods.ShopownerAddress().call().then(console.log);
                                        builder.methods.CallSign().call().then(console.log);
                                        builder.methods.ClassSociety().call().then(console.log);
                                        builder.methods.ScreenshotHash().call().then(console.log);
                                        
                                    });
                            });
        });
