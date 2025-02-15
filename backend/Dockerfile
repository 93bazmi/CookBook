FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
