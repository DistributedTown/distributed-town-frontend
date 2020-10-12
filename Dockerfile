FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY . .
RUN yarn global add serve
RUN yarn install
RUN yarn build
CMD ["serve", "-s", "build", "-l", "3000"]
