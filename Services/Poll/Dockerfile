FROM node:12-alpine
WORKDIR /src
EXPOSE 3010
COPY . /src
COPY package.json /usr/src/app/

RUN npm install


CMD ["npm", "start"]
