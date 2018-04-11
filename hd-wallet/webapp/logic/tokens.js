// Import libraries we need.
   module.exports = function() {
    this.process = function(req, res, utils) {
        var userId = req.params.userId; //RWG-USR-001
        var address = userId;//"0x80d94ab074e781537706b953f66fb6e86f6ef2a0";
        console.log('address:' + address);
        utils.init();
        utils.metaCoin.methods.getBalance(address).call()
                            .then(function(result){
                                console.log('balance:' + result);
                                res.send({"status":"ok","balance:":result});
                            });
    }
};