/*
    Below scripts are to be running in truffle console environment.
*/

var txnUrl = 'http://<TX_URL>:8545';
web3.setProvider(new web3.providers.HttpProvider(txnUrl));
web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>');
var vesselContractBaseAddress = '0x8ea31de93f0714004cc1bb6bd46317f939aa0c44';
var fs = require('fs');
var abiArray = fs.readFileSync('./build/contracts/Vessel.json','utf-8');
var abi = JSON.parse(abiArray);
var vessel = web3.eth.contract(abi.abi).at(vesselContractBaseAddress);// ({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});
var opt = {from:web3.eth.accounts[0], gas:3000000};

var today = (new Date());
var expiry = (new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() ));


//=============================
//var admin = web3.eth.accounts[0];
//var option = {from:admin};
//var gasValue = contract.UpdateInformation.estimateGas('Name of the Ship',10000,10000,'Owner Name 3','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', option);
//option.gas = gasValue;
//var hash = contract.UpdateInformation.sendTransaction('Name of the Ship',1,1,'Owner Name','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', option);
//=============================

//!!! Check Contract.Address to confirm it is mined by running contract.address to check if it is 'undefined' !!!
var hash = vessel.NewBuilderCert.sendTransaction(2, opt);
var result = web3.eth.getTransactionReceipt(hash);
var resp = web3.eth.contract(abi.abi).at(result.to);
var builderAddress = resp.GetBuildCert.call(2);

abiArray = fs.readFileSync('./build/contracts/BuilderCert.json','utf-8');
abi = JSON.parse(abiArray); 
var builder = web3.eth.contract(abi.abi).at(builderAddress);

hash = builder.UpdateInformation.sendTransaction('Name of the Ship',2,1,'Owner Name','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', opt);
result = web3.eth.getTransactionReceipt(hash);
resp = web3.eth.contract(abi.abi).at(result.to);

resp.ShipownerName.call();
resp.IMO.call().toString();