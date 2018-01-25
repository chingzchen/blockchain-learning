/*
    Below scripts are to be running in truffle console environment.
*/

var txnUrl = 'http://<TX_URL>:8545';
web3.setProvider(new web3.providers.HttpProvider(txnUrl));
web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>');
var contractAddress = '0x8ea31de93f0714004cc1bb6bd46317f939aa0c44';//vessel
var fs = require('fs');
var abiArray = fs.readFileSync('./build/contracts/Vessel.json','utf-8');
var abi = JSON.parse(abiArray);
var contract = web3.eth.contract(abi.abi).new({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});

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
var hash = vessel.NewTonnageCert.sendTransaction(IMO, opt);
var result = web3.eth.getTransactionReceipt(hash);
var tonnageAddress = vessel.GetTonnageCert.call(IMO);

//!!! Check Contract.Address to confirm it is mined by running contract.address to check if it is 'undefined' !!!
/*
string _NameOfShip,
                                uint32 _IMO,
                                uint32 _Length,
                                uint32 _Breadth,
                                uint32 _Depth,
                                string _ClassName,
                                uint _DateOfIssue,
                                string _GT,
                                string _NT
*/
abiArray = fs.readFileSync('./build/contracts/TonnageCert.json','utf-8');
abi = JSON.parse(abiArray);
var tonnage = web3.eth.contract(abi.abi).at(tonnageAddress);
hash = tonnage.UpdateInformation.sendTransaction('Name of the Ship',IMO,100,100,100,'Class',today.getTime(),'GT','NT', opt);
result = web3.eth.getTransactionReceipt(hash);
var resp = web3.eth.contract(abi.abi).at(result.to);
resp.GT.call();
resp.IMO.call().toString();
