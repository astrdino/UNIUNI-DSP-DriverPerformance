const warehouse = {
  location: "PHX",
  functionRange: [160991, 160999],
  routeRange: [160001, 160100],
};

const DSP_List = [
  "Top Car Yarde",
  "Haulblaze",
  "Acadia",
  "DEL",
  "Desert State",
  "L Dan",
  "Get Ya Roll",
  "Ming Hui",
];

export const Roles = [
  {
    name: "Top Car Yarde",
    range: [21088, 21137],
    email: "dino.liang0609@gmail.com",
  },
  {
    name: "Haulblaze",
    range: [15287, 15336],
    email: "dinojobs96@gmail.com",
  },
  {
    name: "Acadia",
    range: [20553, 20602],
    email: "dino.liang0609@gmail.com",
  },
  {
    name: "DEL",
    range: [26416, 26465],
    email: "dinojobs96@gmail.com",
  },
  {
    name: "Desert State",
    range: [16549, 16588],
    email: "dino.liang0609@gmail.com",
  },

  {
    name: "L Dan",
    range: [12948, 12997],
    email: "dinojobs96@gmail.com",
  },
  {
    name: "Get Ya Roll",
    range: [22300, 22349],
    email: "dino.liang0609@gmail.com",
  },
  {
    name: "Ming Hui",
    range: [33020, 33120],
    email: "dinojobs96@gmail.com",
  },

  {
    name: `${warehouse.location} Warehouse`,
    range: [160991, 160999],
  },
  {
    name: `${warehouse.location} Route`,
    range: [160001, 160100],
  },
];

// export default function findDSPbyDrID(idInput) {
//   // console.log(DSPs);
//   for (let DSP of DSPs) {
//     if (idInput >= DSP.range[0] && idInput <= DSP.range[1]) {
//       return DSP.name;
//     }
//   }
// }

export function findEmailbyDSP(dspInput) {
  for (let role of Roles) {
    if (dspInput === role.name) {
      return role.email;
    }
  }
}

export default function findRolesbyID(idInput) {
  for (let role of Roles) {
    if (idInput >= role.range[0] && idInput <= role.range[1]) {
      return role.name;
    }

    // if (
    //   idInput >= warehouse["functionRange"][0] &&
    //   idInput <= warehouse["functionRange"][1]
    // ) {
    //   return "PHX Warehouse";
    // }

    // if (
    //   idInput >= warehouse["routeRange"][0] &&
    //   idInput <= warehouse["routeRange"][1]
    // ) {
    //   return "PHX Warehouse";
    // }
  }
}

export { DSP_List };
