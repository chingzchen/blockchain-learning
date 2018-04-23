var UTILS = require('./utils.js');
var util = new UTILS();

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //console.log(__dirname);
    const PROCPATH = './transferToken.js';//__dirname + '\\transferToken.js'
    if (req.body && req.body.to) {
        var PROC = require(PROCPATH);
        var processor = new PROC();
        processor.process(context,req,util);

    }else if(req.query && req.query.to) {
        var PROC = require(PROCPATH);
        var processor = new PROC();
        processor.process(context,req,util);
    }
    else {
        context.res = {
            status: 400,
            body: req
        };
    }
    
};