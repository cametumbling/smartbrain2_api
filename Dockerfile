FROM node:12.14.1

###NB: Uncomment single #s for actual bundling and delete this line

###Create app directory
#RUN mkdir -p /usr/src/smartbrain2_api

WORKDIR /usr/src/smartbrain2_backend

####Install app dependencies
#COPY package.json /usr/src/smartbrain2_api
#RUN npm install

###Bundle app source
#COPY . /usr/src/smartbrain2_api

COPY ./ ./

###Build arguments
#ARG NODE_VERSION=12.14.1

###Environment
#ENV NODE_VERSION $NODE_VERSION

RUN npm install
RUN npm rebuild bcrypt --build-from-source

CMD ["/bin/bash"]
