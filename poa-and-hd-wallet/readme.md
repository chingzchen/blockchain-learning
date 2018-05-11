Overview
========

In this document we will be using POA ARM template to deploy a new Ethereum POA
network on Azure. Then we will use HD-Wallet-Provider to deploy smart contract
and interact with them.

Create Genesis Account
----------------------

1.  Goto <https://www.myetherwallet.com/>

2.  Enter desired password and click “Create New Wallet”

![](media/5b0796f9757dfdcedfbb819c0894990f.png)

3.  Download safely keep KeyStore file. Once downloaded, click “I understand,
    Continue” to continue.

![](media/f87153a54a3691188bd13b6cab6b15b7.png)

4.  Save private key

![](media/83a4c0f3e47bc3dbcf514ea3adb40506.png)

Deploy POA Network
------------------

5.  In this lab we are to create POA with this template:
    <https://github.com/EthereumEx/ethereum-arm-templates/blob/master/ethereum-consortium/template.clickOnce.PoA.json>

6.  Download template, open it with your favorite IDE, we will be changing
    several parameters

7.  Update PrivateKey and Address we created in above steps

![](media/ab5118fedc6b62137484439dc13b040b.png)

8.  Depends on your scenario, you may want to change gaslimit when required.

![](media/32272d0d8512afc4f6a39b1d5ae8969c.png)

9.  The template funds genesis account with this amount of ether, you can change
    that or add additional accounts when required.

![](media/09aa7abc904c2442bd09c02fc67d84d9.png)

10.  Goto Azure Portal, create a Template Deployment and paste modified ARM
    template json.

![](media/353a104ccf24cd46d5149a8f3a22e19c.png)

11.  Verify everything is correct then click Save

12.  Verify required information and give it a SSH public key. You can follow
    [this](https://www.ssh.com/ssh/putty/windows/puttygen) instruction or
    [this](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
    to create one.

![](media/9de79e9ecd37974d4b1e49817cd2e77b.png)

13.  Once verified, click “Purchase” to continue. Take a rest, make yourself a
    cup of coffee, this can take up to an hour.

14.  Once created, open your resource group, looking for a VM scale-set whose
    name ended with “-tx”

![](media/4974958c3382b3f64746c9d7cbc2a7ed.png)

15.  Open it up, and note the IP address or DNS name (if any)

![](media/56a19363a1e302968b30a4e9c8d640d1.png)

Create and Fund our Account
---------------------------

We will be creating a new account and fund it as our default account in this
case. In this step we will be using MetaMask to fund our account, you can
probably write a script to make your life easier, but we really want to
demonstrate how existing tools helps you in this case.

16.  Ssh to your Ubuntu machine (Create on if not any). Download [source
    codes](https://github.com/michael-chi/blockchain-learning/tree/master/poa-and-hd-wallet)
    and do npm install to install dependencies.

17.  Run below command to create a new address, private key and mnemonic

```
   node createAccount.js
```

![](media/44c87cc2d4939b9cfa8696021df62b76.png)

18.  Note down address, key and mnemonic, we will need them later.

19.  Go back to your working machine, open up Chrome.

20.  Install
    [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
    in Chrome

21.  If this is your first time login to MetaMask, you will be promoted to input
    a passphase. Give it a passphase, we don’t need it in this case.

22.  Clicke Network option and then click Custom RPC and update it with your IP
    address.

![](media/d643134504e96678a4795a4e95ccb54f.png)

23.  Click Account menu item and then Import Account

![](media/91d9d2b44d49d2f6c0de89c5d61eea85.png)

24.  Enter your genesis account private key

![](media/f201f48cda4c9a3015ba787e1fe409c1.png)

25.  Name it Genesis Account

![](media/541e895346c523b6b928a4a1742e5aa2.png)

26.  Repeat above step to import the account we created in step 17 and name it
    HDWallet Account

27.  From Genesis Account, transfer Ether to HDWallet account. As we are to use
    HDWallet account to deploy smart contract and submit transaction…etc.

28.  Make sure your HDwallet account does have Ether before you go to next step.

![](media/2c954320d406cc99a209458eb1398e6c.png)

Deploy Smart Contract
---------------------

29.  Ssh to your truffle box (create from Azure if not any). Run “truffle init”
    to create a new project, download [source
    codes](https://github.com/michael-chi/blockchain-learning/tree/master/poa-and-hd-wallet/smartcontracts)
    to newly created truffle folder

![](media/e97be9259a8c4ccf7ec25d9815e1956c.png)

30.  Run “npm install” to install dependencies, specifically,
    truffle-hdwallet-provider.

![](media/faab136f81e3901b26939e081ed864ad.png)

31.  Open up truffle.js by running “sudo nano truffle.js”

32.  Add HD-Wallet dependency and mnemonic to beginning of the script. Note that
    the mnemonic is the HDWallet Account one we created in step 17

![](media/9df8b3ef630d03775964d9cd6418476f.png)

33.  Add new network. Note that in my template I have my gaslimit set to 6500000
    so here I specified a gas higher than default (4712388). In your case you
    probably can remove it.

![](media/f98e58676757c8ded648a0cf2e247937.png)

34.  Save it

35.  Create or update migrations/2_deploy.js to specify smart contracts need to
    be deployed.

![](media/1373af9ab290dd83b2e9f4411c95d94a.png)

36.  Run below command to compile and deploy smart contracts
```
   truffle migrate --network poa
```
![](media/c948011b616f63d99cf8a266aa0d85d5.png)

37.  Note down above contract address.

Run test scripts
----------------

38.  Open up config.js and modify parameters

![](media/d4e5b5200709571130987be17145a3c3.png)

-   TXNURL is the transaction node URL we noted from Azure Portal

-   ADMIN_ACCOUNT is the HDWallet Account address we created above

-   ADMIN_MNEMONIC is the HDWallet account mnemonic we created above

-   The rests are contract addresses, update accordingly

39.  Run below command to see how it works
```
   node test-newBuilderCert.js
```
![](media/ac0920a9abdcdd03fd1d1ed0977a24e0.png)

Conclusion
==========

With POA template, the transaction time reduced from around 10-20 seconds to
around 3-5 seconds (depends on your genesis file configuration). Which probably
be a better fit to enterprise scenario in terms of performance.
