FROM node:22.14.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
