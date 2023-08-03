FROM node:18.12-alpine
WORKDIR /opt/adaptation-frontend
COPY ./dist/apps/frontend .
RUN npm install
CMD ["npm", "run", "start", "frontend"]