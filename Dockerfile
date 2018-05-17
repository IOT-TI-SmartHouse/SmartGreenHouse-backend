FROM node:latest
COPY /frontend /app
WORKDIR /app
RUN npm install
RUN npm run-script build

FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install --only=production
COPY --from=0 /app/dist/ public
RUN ls public
EXPOSE 3000
CMD [ "npm", "start" ]
