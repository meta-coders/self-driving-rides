const fs = require("fs");

const inputFiles = [
  "a_example.in",
  "b_should_be_easy.in",
  "c_no_hurry.in",
  "d_metropolis.in",
  "e_high_bonus.in"
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
  const rawData = fs.readFileSync('../input/'+fileName, 'utf8');
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
      }
    })
  }
  return Object.assign({}, metaObject, {routes});
}

const readData = () => {
  return inputFiles.map(fileName => rawFileToData(fileName));
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
  dist
};
