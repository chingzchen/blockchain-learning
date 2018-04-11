var express = require('express');
var bodyParser = require('body-parser');
var UTILS = require('./utils.js');
var util = new UTILS();
const port = 8000;
var app = express();
// === Express Body parser ===
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ===========================
//app.use('/static', express.static('public'));

// === Exception handling ===
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('unhandled exception:' + err);
});
//===========================

/*
app.map({
    '/tokens/:userId': {
        get: pets.get
        //get: (new require('./logic/transferToken.js')()).process(req, res, utils)
        
    }
});
*/

app.get('/tokens/:userId', function(req, res){
    var PROC = require('./logic/tokens.js');
    var processor = new PROC();
    processor.process(req,res,util);

});

app.post('/transferToken', function(req, res) {
    var PROC = require('./logic/transferToken.js');
    var processor = new PROC();
    processor.process(req,res,util);
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
