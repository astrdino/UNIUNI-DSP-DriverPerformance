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
];

export const DSPs = [
  {
    name: "Top Car Yarde",
    range: [21088, 21137],
  },
  {
    name: "Haulblaze",
    range: [15287, 15336],
  },
  {
    name: "Acadia",
    range: [20553, 20602],
  },
  {
    name: "DEL",
    range: [26416, 26465],
  },
  { name: "Desert State", range: [16549, 16588] },
  {
    name: "L Dan",
    range: [12948, 12997],
  },
  {
    name: "Get Ya Roll",
    range: [22300, 22349],
  },
];

export default function findDSPbyDrID(idInput) {
  // console.log(DSPs);
  for (let DSP of DSPs) {
    if (idInput >= DSP.range[0] && idInput <= DSP.range[1]) {
      return DSP.name;
    }
  }
}

export function findRolesbyID(idInput) {
  for (let DSP of DSPs) {
    if (idInput >= DSP.range[0] && idInput <= DSP.range[1]) {
      return DSP.name;
    }

    if (
      idInput >= warehouse["functionRange"][0] &&
      idInput <= warehouse["functionRange"][1]
    ) {
      return "PHX Warehouse";
    }

    if (
      idInput >= warehouse["routeRange"][0] &&
      idInput <= warehouse["routeRange"][1]
    ) {
      return "PHX Warehouse";
    }
  }
}

export { DSP_List };
