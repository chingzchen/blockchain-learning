/*
    Below scripts are to be running in truffle console environment.
*/

var txnUrl = '<TX_URL>';
//web3.setProvider(new web3.providers.HttpProvider(txnUrl));
web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>', 3000000);
var contractAddress = '0x8ea31de93f0714004cc1bb6bd46317f939aa0c44';//vessel
var fs = require('fs');
var abiArray = fs.readFileSync('./build/contracts/Vessel.json','utf-8');
var abi = JSON.parse(abiArray);
var contract = web3.eth.contract(abi.abi).at(contractAddress);({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});

var today = (new Date());
var opt = {from:web3.eth.accounts[0], gas:3000000};
var expiry = (new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() ));


/*=============================*/
//var admin = web3.eth.accounts[0];
//var option = {from:admin};
//var gasValue = contract.UpdateInformation.estimateGas('Name of the Ship',10000,10000,'Owner Name 3','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', option);
//option.gas = gasValue;
//var hash = contract.UpdateInformation.sendTransaction('Name of the Ship',1,1,'Owner Name','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', option);
/*=============================*/
var IMO = 10;
var vessel = web3.eth.contract(abi.abi).at(contractAddress);
var hash = vessel.NewClassCert.sendTransaction(IMO, opt);
var result = web3.eth.getTransactionReceipt(hash);
var classAddress = vessel.GetClassCert.call(IMO);

//!!! Check Contract.Address to confirm it is mined by running contract.address to check if it is 'undefined' !!!
/*
string  _NameOfShip,
                                uint32  _IMO,
                                string  _ShipType,
                                string  _ClassName,
                                uint  _DateOfIssue,
                                uint  _DateOfExpiry,
                                string  _GT,
                                string _NT
*/
abiArray = fs.readFileSync('./build/contracts/ClassCert.json','utf-8');
abi = JSON.parse(abiArray);
var cc = web3.eth.contract(abi.abi).at(classAddress);
hash = cc.UpdateInformation.sendTransaction('Name of the Ship',IMO,'Type','Class',today.getTime(),expiry.getTime(),'GT','NT', opt);
result = web3.eth.getTransactionReceipt(hash);
var resp = web3.eth.contract(abi.abi).at(result.to);
resp.GT.call();
resp.IMO.call().toString();
