var mnemonic = 'xxx xxx xxx xxx xxx nature planet fitness inquiry cook poet tower icon';
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    networks: {
        azurehd: {
            provider: new HDWalletProvider(mnemonic, "http://xxxxxx.eastasia.cloudapp.azure.com:8545"),
            port: 8545,
            gas:4712388,
            network_id: "*"
        },
        poa: {
            provider: new HDWalletProvider(mnemonic, "http://xx.xx.xx.xx:8545"),
            port: 8545,
            gas:6000000,
            network_id: "*"
        }
    }
};
