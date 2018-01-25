var builder = artifacts.require("./contracts/BuilderCert.sol");
var cc = artifacts.require("./contracts/ClassCert.sol");
var tonnage = artifacts.require("./contracts/TonnageCert.sol");
var vessel = artifacts.require("./contracts/Vessel.sol");

module.exports = function(deployer) {
    deployer.deploy(cc).then(function(){
        deployer.deploy(builder).then(function(){
            deployer.deploy(tonnage).then(function(){
                deployer.deploy(vessel);
            });
        });
    });
};
