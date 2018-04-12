Overview
========

This document introduces how to create a Docker image that runs Web3.JS web
application and deploy to Azure Web App (Linux)

Reference
=========

-   <https://docs.microsoft.com/en-us/azure/app-service/containers/tutorial-custom-docker-image>

Create Docker Image
===================

-   Create a Ubuntu 16.04 Machine and ssh into it

-   Install [Docker
    CE](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)

-   Clone
    <https://github.com/michael-chi/blockchain-learning/tree/master/hd-wallet/webapp>
    to your local development environment

-   [Dockerfile](https://github.com/michael-chi/blockchain-learning/blob/master/hd-wallet/webapp/Dockerfile)
    shows required packages and steps. In this Dockerfile, we

    -   Use official Node.Js 9.11 image as base image

![](media/8019a41e9ce571b369ae289d4780551c.png)

-   Install below node.js packages for our sample web app. (Listed in
    package.json)

![](media/a7931000885f395eb33b11f6f9a0c541.png)

-   Expose TCP port 8000 and 2222, we will be using 8000 for our web app and
    2222 for ssh

![](media/e050423e4d96b40cdad837f52ad48131.png)

-   Switch to cloned web app folder and execute below command to build our
    docker image

```
sudo docker build –tag \<YOUR DOCKER ID\>/linuxwebapp:0.5 .
```
For example, below’s my command
```
sudo docker build –tag kalschi/linuxwebapp:0.5 .
```
-   Once completed, run “sudo docker images” to check newly created image exists

![](media/a5ad9c64eb1ddfe91302d8af9141c789.png)

-   Once completed, login to Docker Hub by running
```
sudo docker login
```
-   Input your Docker Id (NOT Email) and Password to login to Docker hub
![](media/c7ec4db5425737d2bff6e15fe42b6d67.png)

-   Execute below command to push your docker image to docker hub

```
sudo docker push \<YOUR DOCKER ID\>/linuxwebapp:0.5
```
- For example,

```
sudo docker push kalschi/linuxwebapp:0.5
```
![](media/0225be865af2629ca32e23d56913944e.png)

-   Once completed, verify pushed image in your docker hub.

![](media/b9e06a41f5769dcfe2974b8e614323cb.png)

Create Linux Web App Service Plan
=================================

-   Go to Azure Portal, create new App Service Plan

![](media/85e381714f83640b9abdcc1d0faf0cb1.png)

-   Choose Linux as Operation System

![](media/22c07b0a27ff148c802ac67f5667b988.png)

-   Once completed, Open Cloud Shell

![](media/3b0e219226efbf96330976201feea76a.png)

-   Execute below command to create a new Linux Web App

```
az webapp create --resource-group \<RESOURCE GROUP NAME\> --plan \<YOUR PLAN
>   NAME\> --name \<WEB APP NAME\> --deployment-container-image-name \<DOCKER
>   IMAGE\>
```
For example,
```
az webapp create --resource-group michi-ethereum-consortium-rg --plan
   michi-linuxappservice-plan --name michi-linux-web3app
   --deployment-container-image-name kalschi/linuxwebapp:0.5
```
![](media/9b248b90bee7182db0b5175e3ef65877.png)

-   You should see below output

![](media/28f5d36e8329041d4e4043f86adbcd2f.png)

-   Execute below command to setup 8000 port as our internal communication port
    so that Web App forwards incoming request to this port which we exposes.
```
az webapp config appsettings set --resource-group \<RESOURCE GROUP NAME\>
>   --name \<WEB APP NAME\> --settings WEBSITES_PORT=8000
```
For example,
```
az webapp config appsettings set --resource-group
   michi-ethereum-consortium-rg --name michi-linux-web3app --settings
   WEBSITES_PORT=8000
```
![](media/2d545c5aaa093394efa25c05601fc016.png)

-   You should see below output
![](media/1516ee41603492b8d1b2aa1345224d9e.png)

-   And it works!
![](media/e5ede9c77413b31aca859b6184ae6c03.png)
