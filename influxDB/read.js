

const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/** Environment variables **/
const url = 'http://localhost:8086';
const token = "PLHVTO5-hxRlXKPPOVhwmt2BMH21knPYk5jhxS5aBmFQosilbYVD-DAmmVNkAswMWu-NTlu-uQ3gmIUrhGemtQ==";
const org = "FuelLink";
const bucket = "FuelLink";

const influxDB = new InfluxDB({ url, token })
const queryApi = influxDB.getQueryApi(org)

const fluxQuery = `from(bucket:"FuelLink") |> range(start: 0) |> filter(fn: (r) => r._measurement == "pressure")`


const myQuery = async () => {
    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values)
      console.log(
        `${o._time} ${o._measurement} (${o.sensor_id}): ${o._field}=${o._value}`
      )
    }
  }
  
  /** Execute a query and receive line table metadata and rows. */
  myQuery()
  