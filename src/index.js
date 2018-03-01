'use strict';

const { readData, dist, writeData } = require('./inputParser');

const arrData = readData();

for (const data of arrData) {
  const cars = data.vehicles;
  const rides = data.routes;

  const sort = (a, b) => b.start.time - a.start.time;
  rides.sort(sort);

  while (rides.length > 0) {
    const ride = rides.shift();
    const routeLen = dist(ride.start, ride.finish);

    let minCar = 0;
    let minTime = data.end;
    for (let k = 0; k < data.vehicles.length; k++) {
      const c = cars[k];
      const toSP = dist(c, ride.start);
      const toST = ((ride.start.time - (c.freeTime + toSP)) > 0) ?
        (ride.start.time - (c.freeTime + toSP)) + c.freeTime + toSP :
        (c.freeTime + toSP);
      const full = toST + routeLen;
      if (full > ride.finish.time || full > data.end) continue;
      if (full < minTime) {
        minTime = full;
        minCar = k;
      }
    }
    cars[minCar].routesToDrive.push(ride);
    cars[minCar].x = ride.finish.x;
    cars[minCar].y = ride.finish.y;
    cars[minCar].freeTime = minTime;
    cars.sort((car1, car2) => (car1.freeTime > car2.freeTime) ? -1 : 1);
  }

  writeData(cars, data.fileName);
}
