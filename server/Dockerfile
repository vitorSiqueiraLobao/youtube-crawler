FROM node:14.17.0-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . . 
EXPOSE 4000
CMD [ "yarn", "start"]