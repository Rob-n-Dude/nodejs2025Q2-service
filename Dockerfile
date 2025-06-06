FROM node:22

WORKDIR /homeLib

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--watch", "src", "src/main.ts"]s