FROM node:22-alpine

WORKDIR /influxDB
COPY ./influxDB/package.json ./package.json
COPY ./influxDB/package-lock.json ./package-lock.json
RUN npm install
COPY ./influxDB/* ./

WORKDIR /fuelLink-app
COPY ./fuelLink-app/package.json ./package.json
COPY ./fuelLink-app/package-lock.json ./package-lock.json
RUN npm install -g @angular/cli
RUN npm install --force
COPY ./fuelLink-app ./
EXPOSE 4200
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
