# Base the image on the built-in Azure Functions Linux image.
FROM microsoft/azure-functions-runtime:2.0.0-jessie
ENV AzureWebJobsScriptRoot=/home/site/wwwroot

# Add files from this repo to the root site folder.
COPY . /home/site/wwwroot 





# update
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update
RUN apt-get install -y git        
# build-essential & python
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN apt-get install -y curl



RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Node.Js dependencies
RUN mkdir -p /home/site/wwwroot/HttpFunction/node_modules
#RUN npm install --prefix /home/site/wwwroot/HttpFunction
#npm install ./HttpFunction --prefix ../test
RUN npm install /home/site/wwwroot/HttpFunction --prefix /home/site/wwwroot/HttpFunction
     