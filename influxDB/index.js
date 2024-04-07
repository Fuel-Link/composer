
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/** Environment variables **/
const url = 'http://localhost:8086';
const token = "PLHVTO5-hxRlXKPPOVhwmt2BMH21knPYk5jhxS5aBmFQosilbYVD-DAmmVNkAswMWu-NTlu-uQ3gmIUrhGemtQ==";
const org = "FuelLink";
const bucket = "FuelLink";

const influxDB = new InfluxDB({ url, token })

const writeApi = influxDB.getWriteApi(org, bucket)

  const point1 = new Point('fuelUsageData')
  .tag('plate', '90-ON-89')
  .floatField('liters', 45)
  .timestamp(new Date('2024-03-16T15:30:00Z'))
  console.log(` ${point1}`)
    writeApi.writePoint(point1)


/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
  console.log('WRITE FINISHED')
})

