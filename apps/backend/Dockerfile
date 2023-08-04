FROM node:18.13-alpine
WORKDIR /opt/adaptation-backend
COPY ./dist/apps/backend/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/backend .
CMD ["node", "./main.js"]