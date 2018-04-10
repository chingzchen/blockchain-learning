
//=================================================================
/*
    Below scripts demonstrates how to leverage Web3.Js node package to interact wit Ethereum Smart contract.
*/
var WEB3 = require('web3');
var web3 = new WEB3();
var txnUrl = 'http://<TX_URL>:8545';
web3.setProvider(new web3.providers.HttpProvider(txnUrl));
web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>');
var vesselContractBaseAddress = '0x8ea31de93f0714004cc1bb6bd46317f939aa0c44';
var fs = require('fs');
var abiArray = fs.readFileSync('./build/Vessel.json','utf-8');
var abi = JSON.parse(abiArray);
//var vessel = web3.eth.contract(abi.abi).at(vesselContractBaseAddress);// ({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});
var opt = {from:web3.eth.accounts[0], gas:3000000};

function LoadCertABI(path){
    var f = require('fs');
    var text = f.readFileSync(path,'utf8');
    var interface = JSON.parse(text);    
    return interface;
}

function LoadContract(web3, abi, address){
    return web3.eth.contract(abi).at(address);
}

web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>');

var opt = {from:web3.eth.accounts[0], data: abi.bytecode, gas:3000000};
var myContract = null;//web3.eth.contract(interface.abi).new(opt);
var IMO = 5;
console.log('creating new contract...');

var vessel = web3.eth.contract(abi.abi).at(vesselContractBaseAddress);// ({from:web3.eth.accounts[0], gas:3000000, data:abi.bytecode});
//Create a new BuilderCert
vessel.NewClassCert.sendTransaction(IMO, opt, 
    function (err,result){
        console.log('NewClassCert transaction sent, mining...');
        if (err) {
            console.log('Error:'+err);
            return;
        }
        txhash = result;
        filter = web3.eth.filter('latest');
        filter.watch(function (error, result) {
            var receipt = web3.eth.getTransactionReceipt(txhash);
            if (receipt && receipt.transactionHash == txhash) {
                filter.stopWatching();
                //BuilderCert created
                var classCertAddress = vessel.GetClassCert.call(IMO);
                if( web3._extend.utils.toDecimal(classCertAddress) == 0){
                    //class cert has not been created yet
                    return;
                }                
                console.log('class cert address:' + classCertAddress);

                //Update BuilderCert Info
                var abi = LoadCertABI('./build/ClassCert.json');
                var classCert = LoadContract(web3, abi.abi, classCertAddress);

                var today = (new Date());
                var opt = {from:web3.eth.accounts[0], gas:3000000};
                var expiry = (new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() ));
                var hash = classCert.UpdateInformation.sendTransaction('Name of the Ship',IMO,'Type','Class',today.getTime(),expiry.getTime(),'GT','NT', opt,
                    function (err,result){
                        console.log('UpdateInformation transaction sent, mining...');
                        if (err) {
                            console.log('Error:'+err);
                            return;
                        }
                        txhash = result;
                        filter = web3.eth.filter('latest');
                        filter.watch(function (error, result) {
                            var receipt = web3.eth.getTransactionReceipt(txhash);
                            if (receipt && receipt.transactionHash == txhash) {
                                filter.stopWatching();
                                console.log('===============================================');
                                console.log('NameOfShip=' + classCert.NameOfShip.call());
                                console.log('IMO=' + classCert.IMO.call());
                                console.log('===============================================');
                            }
                        });                
                    });    

                //====================
            }
        });
    }
);

