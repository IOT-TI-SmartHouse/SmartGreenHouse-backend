FROM node:latest as angular_builder
COPY /frontend /app
WORKDIR /app
RUN npm install
RUN npm run-script build

FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install --only=production
COPY --from=angular_builder /dist /public
COPY --from=angular_builder /app/dist /public
EXPOSE 3000
CMD [ "npm", "start" ]