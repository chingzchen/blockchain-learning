/*
    Below scripts demonstrates how to leverage Web3.Js node package to interact wit Ethereum Smart contract.
*/
var WEB3 = require('web3');
var web3 = new WEB3();
var txnUrl = 'http://<TX_URL>:8545';
web3.setProvider(new web3.providers.HttpProvider(txnUrl));
var contractAddress = '0x834801908759c80cb9650aa96a4bf40162d7caad';
var fs = require('fs');
var text = fs.readFileSync('./build/BuilderCert.json','utf8');
var interface = JSON.parse(text);

web3.personal.unlockAccount(web3.eth.accounts[0],'<PASSWORD>');

var opt = {from:web3.eth.accounts[0], data: interface.bytecode, gas:3000000};
var myContract = null;//web3.eth.contract(interface.abi).new(opt);

console.log('creating new contract...');
web3.eth.contract(interface.abi).new(opt, function (err, contract) {
    if (err) {
        alert(err);
        return;
    // callback fires twice, we only want the second call when the contract is deployed
    } else if(contract.address){
        
        myContract  = contract;
        console.log('contract created, address: ' + myContract.address);
        var today = new Date();
        var opt = {from:web3.eth.accounts[0], gas:3000000};
        var expiry = new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() );
        
        var hash = myContract.UpdateInformation.sendTransaction('Name of the Ship',10000,10000,'Owner Name 3','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', opt,
                    function (err,result){
                        console.log('transaction sent, mining...');
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
                                console.log('NameOfShip=' + myContract.NameOfShip.call());
                                console.log('ShipownerName=' + myContract.ShipownerName.call());
                                console.log('ShopownerAddress=' + myContract.ShopownerAddress.call());
                                console.log('ShipyardAddress=' + myContract.ShipyardAddress.call());
                                console.log('IMO=' + myContract.IMO.call());
                                var issueDate = new Date(parseFloat(myContract.DateOfExpiry.call().toString()) );
                                console.log('Issue date=' +issueDate);
                                var expireDate = new Date(parseFloat(myContract.DateOfExpiry.call().toString()) );
                                console.log('Expiry date=' +expireDate);
                                console.log('===============================================');
                            }
                        });                
                    });         
        myContract = contract;
        
    }else{
        console.log('mining...');
    }
});
/*
console.log(myContract);
var today = new Date();
var opt = {from:web3.eth.accounts[0], gas:3000000};
var expiry = new Date( today.getFullYear() + 1, today.getMonth(), today.getDate() );

var hash = myContract.UpdateInformation.sendTransaction('Name of the Ship',10000,10000,'Owner Name','Owner Address', 'Designation' ,'POA' ,today.getTime(),expiry.getTime(),'Shipyard address', opt,
            function (err,result){
                if (err) {
                    alert('Err'+err);
                    return;
                }
                txhash = result;
                filter = web3.eth.filter('latest');
                filter.watch(function (error, result) {
                    var receipt = web3.eth.getTransactionReceipt(txhash);
            
                    if (receipt && receipt.transactionHash == txhash) {
                        filter.stopWatching();
                        console.log('ShipownerName=' + myContract.ShipownerName.call());
                    }
                });                
            }); 
*/
/*
var hash = myContract.UpdateInformation.sendTransaction('',0,0,'','', '' ,'' ,0,0,'', opt,
            function (err,result){
                if (err) {
                    alert('Err'+err);
                    return;
                }
                txhash = result;
                filter = web3.eth.filter('latest');
                filter.watch(function (error, result) {
                    var receipt = web3.eth.getTransactionReceipt(txhash);
            
                    if (receipt && receipt.transactionHash == txhash) {
                        filter.stopWatching();
                        console.log('ShipownerName=' + myContract.ShipownerName.call());
                    }
                });                
            }); 

*/
//var result = web3.eth.getTransactionReceipt(hash);

//console.log(result);