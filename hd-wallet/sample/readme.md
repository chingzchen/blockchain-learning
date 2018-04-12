Overview
========

This lab shows how to use HD Wallet provider to manage accounts and transactions
so that instead of using private key to sign transaction on our own, we reply on
HD wallet provider to sign transaction for us.

We will be creating two account address from HD wallet, say account 1 and account2. Then we will deploy MetaCoin contract to Ethereum. And transfer some MetaCoin from account 1 to account2.

Setup Ethereum Network
======================

-   We use new Azure Ethereum consortium network template to setup an Ethereum
    environment in the cloud.

//TO BE ADDED

Create New Address from HD Wallet
=================================

-   Run below script to create new account address
```javascript
node hd-createAccount.s
```
-   You should see output like this. mnemonic is the secret words that we will
    be using to “unlock” our account and sign transactions. The second line is
    the account address created and associated with that secret (mnemonic)

![](media/cfb15c6631c063b4c02724676633208e.png)

Grant Ether
===========

-   Go to Ethereum console and grant some ether to the newly created account.
    The URL of console is listed in Azure’s deployment output section.

![](media/783eb4922c0525543d7f908fd2237486.png)

-   Grant some ether

![](media/81fe7d9837b42c31315b9df8167443ac.png)

Deploy MetaCoin Token
=====================

-   We will be using sample token contract provided by truffle here for testing.

-   Install HD Wallet Provider by running below command
```javascript
    npm install truffle-hdwallet-provider
```
-   Update truffle.js as below
```javascript
var mnemonic = '\<THE MNEMONIC WE CREATED ABOVE\>';
var HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
    networks: {
        azurehd: {
            provider: new HDWalletProvider(mnemonic, "\<TXN NODE URL\>"),
            port: 8545,
            gas:4712388,
            network_id: "\*"
        },
        azure: {
            host: "\<TXN NODE URL\>",
            port: 8545,
            gas:4712388,
            network_id: "\*"
        }
    }
};
```
-   Run below command to deploy contract
```javascript
    truffle deploy
```
-   This will deploy MetaCoin contract using the account we created above.

Transfer Token
==============

-   Create another address using HD Wallet and note down the account address
    (account 2)

-   Execute below script to transfer MetaCoin to this newly created account
    (account 2)
```javascript
node hd-transfertoken.js \<metacoin deployment account address\> \<mnemonic\>
\<account 2\>
```
![](media/2091048314ea59a9ae3f66feb7ac2d24.png)

Check Token Balance
===================

-   Run below script to check token balance
```javascript
node hd-checkTokenBalance \<account address\> \<mnemonic\>
```
![](media/de07c7bdb65d6073d26a86094e8b50ea.png)

References
==========
- ethereumjs-wallet: https://github.com/ethereumjs/ethereumjs-wallet
- eth-hd-wallet: https://github.com/meth-project/eth-hd-wallet
- hd-wallet-provider: https://github.com/trufflesuite/truffle-hdwallet-provider

