FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install --only=production
EXPOSE 3000
CMD [ "npm", "start" ]