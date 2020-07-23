FROM node:12.14.1

WORKDIR /usr/src/smartbrain2_api

COPY ./ ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source

CMD ["/bin/bash"]
