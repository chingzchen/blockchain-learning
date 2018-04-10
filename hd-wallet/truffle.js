var mnemonic = '<YOUR MNEMONIC>';
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
networks: {
    azurehd: {
      provider: new HDWalletProvider(mnemonic, "<TXN NODE URL>"),
      port: 8545,
      gas:4712388,
      network_id: "*"
    },
    azure: {
      host: "<TXN NODE URL>",
      port: 8545,
      gas:4712388,
      network_id: "*"
    }    
  }
};

