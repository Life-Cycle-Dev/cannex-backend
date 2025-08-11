FROM node:22.13

WORKDIR /

COPY . .

RUN npm install && npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
