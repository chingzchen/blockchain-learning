// Import libraries we need.
    /*
    /transferToken/:from/:to
    {
        "token":<points>,
        "mnemonic":<mnemonic>
    }
    */
module.exports = function() {
    this.process = function(req, res, utils) {
        var to = req.body.to;
        var token = req.body.token;
        var mnemonic = req.body.mnemonic;
        console.log('to:' + to + '|token:' + token + '|mnemonic:' + mnemonic);
        utils.initHDWallet(mnemonic);
        utils.metaCoin.methods.sendCoin(to, 1).send({from:utils.hdProvider.address,gas:3000000})
                .on('error', function(err){
                    console.log('error:' + err);
                })
                .on('transactionHash', function(hash){
                    console.log('hash:' + hash);
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    //console.log('confirmationNumber:' + confirmationNumber);
                })
                .on('receipt', function(receipt){
                    console.log('receipt:' + receipt);
                    //console.log('balance:' + utils.metaCoin.methods.metaCoin(from).call());  
                    res.send({"result":"ok", "receipt":receipt});                  
                });
        
    }
};