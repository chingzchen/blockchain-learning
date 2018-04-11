FROM node:9.11-stretch

# application
RUN mkdir /code
WORKDIR /code

ADD . /code/

# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "$SSH_PASSWD" | chpasswd 
RUN apt-get install -y git


COPY ./docker/sshd_config /etc/ssh/


# build-essential & python
RUN apt-get install -y build-essential
RUN apt-get install -y python

# node.js modules
WORKDIR /code
# === For testing ===
#RUN npm install body-parser
#RUN npm install eth-hd-wallet
#RUN npm install ethereumjs-wallet
#RUN npm install express
#RUN npm install truffle-contract
#RUN npm install truffle-hdwallet-provider
#RUN npm install web3
#=====================
RUN npm install

EXPOSE 8000 2222

CMD ["node", "/code/app.js"]
#ENTRYPOINT ["bash"]
