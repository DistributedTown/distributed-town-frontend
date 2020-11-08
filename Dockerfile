FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


