FROM node:6

ADD example.js ./
ADD dbconfig.js ./
ADD package.json ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
