FROM node:18.13-alpine
WORKDIR /opt/adaptation-frontend
ENV PATH /opt/adaptation-frontend/node_modules/.bin:$PATH
COPY ./dist/apps/frontend/package.json .
RUN npm install 
RUN npm install react-scripts@5.0.1 -g 
COPY ./dist/apps/frontend .
CMD ["npm","run", "start"] 