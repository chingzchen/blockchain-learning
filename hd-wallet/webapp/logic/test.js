var txnUrl = 'http://ethyrf-dns-reg1.eastasia.cloudapp.azure.com:8545';
var METACOIN_ADDRESS = '0xdc41410ec91df27d824cfd161f80fddfff674181';

const Web3 = require('web3');
var hdWeb3 = new Web3();

module.exports = function(name, age) {

    this.name = name;
    this.age = age;
    
    this.get_name = function() {
        return this.name;
    }
    
    this.get_age = function() {
        return this.age;
    }
};