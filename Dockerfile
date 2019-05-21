FROM node:6

ADD example.js ./
ADD dbconfig.js ./
ADD package.json ./
ADD . / public ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
