'use strict';

const { readData, dist } = require('./inputParser');

const data = readData()[1];
const cars = data.vehicles;
const rides = data.routes;

const sort = (a, b) => b.start.time - a.start.time;
rides.sort(sort);

while (rides.length > 0) {
  const ride = rides.shift();
  const routeLen = dist(ride.start, ride.finish);

  for (let k = 0; k < data.vehicles.length; k++) {
    const c = cars[k];
    const toSP = dist(c, ride.start);
    const toST = ((ride.start.time - c.freeTime + toSP) > 0) ?
      (ride.start.time - c.freeTime + toSP) :
      (c.freeTime + toSP);
    const full = toST + routeLen;
    if (full > ride.finish.time || full > data.end) continue;
    c.routesToDrive.push(ride);
    c.x = ride.finish.x;
    c.y = ride.finish.y;
    c.freeTime += full;
    break;
  }
}

console.dir(cars);
