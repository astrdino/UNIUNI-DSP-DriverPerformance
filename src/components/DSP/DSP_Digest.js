import * as React from "react";

//Front end

import Button from "@mui/material/Button";

export const DSP_Digest = (DSP) => {
  const rows: GridRowsProp = [
    { id: 1, col1: "16545", col2: 34 },
    { id: 2, col1: "23124", col2: 54 },
    { id: 3, col1: "22314", col2: 324 },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Driver ID", width: 100 },
    { field: "col2", headerName: "Pick-Up", width: 150 },
    { field: "col3", headerName: "Total Finished Parcels", width: 150 },
  ];
  return <div className="DSP-Digest"></div>;
};
