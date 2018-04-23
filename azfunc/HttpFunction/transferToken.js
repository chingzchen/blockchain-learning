module.exports = function() {
    this.process = function(context,req, utils) {
        var to = "", token = 0, mnemonic="";
        if(req.body){
            to = req.body.to;
            token = req.body.token;
            mnemonic = req.body.mnemonic;
        }else{
            to = req.query.to;
            token = parseInt(req.query.token);
            mnemonic = req.query.mnemonic;            
        }
        
        console.log('to:' + to + '|token:' + token + '|mnemonic:' + mnemonic);
        utils.initHDWallet(mnemonic);
        utils.metaCoin.methods.sendCoin(to, 1).send({from:utils.hdProvider.address,gas:3000000})
                .on('error', function(err){
                    console.log('error:' + err);
                    context.res = {
                        status: 400,
                        body: err
                    };
                    context.done();
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
                    //res.send({"result":"ok", "receipt":receipt});             
                    context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: receipt
                    };
                    context.done();
                });
    }
};