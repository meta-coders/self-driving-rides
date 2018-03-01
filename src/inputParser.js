const fs = require("fs");

const inputFiles = [
  "a_example",
  "b_should_be_easy",
  "c_no_hurry",
  "d_metropolis",
  "e_high_bonus"
]

const metaObj = (line) => {
  const vehicles = [];
  for (let i=0; i<line[2]; i++) {
    vehicles.push({
      x:0,
      y:0,
      freeTime:0,
      routesToDrive:[],
    })
  }

  return {
    city:[line[0],line[1]],
    bonus: line[4],
    end: line[5],
    routesCount: line[3],
    vehicles
  };
}

const rawFileToData = ( fileName ) => {
  const rawData = fs.readFileSync('../input/'+fileName+'.in', 'utf8');
  const arrData = rawData.split('\n').map(line =>
    line.split(' ')
  )
  const metaLine = arrData.shift();
  const metaObject = metaObj(metaLine);
  const routes = [];
  for (let i = 0; i < metaObject.routesCount; i++) {
    const route = arrData[i];
    routes.push({
      start: {
        ...coordinate(route[0], route[1]),
        time: route[4],
      },
      finish: {
        ...coordinate(route[2], route[3]),
        time: route[5],
      },
      get distance() {
        return dist(this.start, this.finish);
      },
      i
    })
  }
  return Object.assign({}, metaObject, {routes}, {fileName});
}

const readData = () => {
  return inputFiles.map(fileName => rawFileToData(fileName));
}

const writeData = (cars, fileName) => {
  const arrCars = cars.map(car => {
    const obj = [car.routesToDrive.length];
    for (const route of car.routesToDrive) {
      obj.push(route.i);
    }
    return obj.join(' ');
  });
  console.log(arrCars);
  const fileCars = arrCars.join('\n');
  fs.writeFileSync('../input/'+fileName+'.out', fileCars);
}

const coordinate = (x, y) => ({x, y});
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// {
//   bonus,
//   end,
//   city:[R,C],
//   vehicles:[
//     {
//       x,
//       y,
//       freeTime,
//       routesToDrive:[{route}],
//     }...
//   ],
//   routes:[
//     {
//       start: {
//         ...coordinate(start),
//         time,
//       },
//       finish: {
//         ...coordinate(finish),
//         time,
//       },
//       get distance() {
//         return dist(this.start, this.finish);
//       },
//     }...
//   ],
// }

module.exports = {
  readData,
  writeData,
  dist
};
