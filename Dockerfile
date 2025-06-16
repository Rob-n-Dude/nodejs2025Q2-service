FROM node:22-alpine

WORKDIR /homeLib

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g nodemon

RUN npm cache clean --force

COPY . .

CMD ["nodemon", "--watch", "src", "src/main.ts"]