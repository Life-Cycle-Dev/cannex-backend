FROM node:22

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && yarn build

EXPOSE 1337

CMD ["yarn", "start"]
