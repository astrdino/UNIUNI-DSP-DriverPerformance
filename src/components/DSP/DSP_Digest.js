import * as React from "react";

//Front end
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
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
  return (
    <div className="DSP-Digest">
      <div className="DSP-Digest-Greeting">
        <h1>Hello, {DSP} </h1>
        <p>04-02-2020 Tue</p>
        <Button>Log out</Button>
      </div>
      <div className="DSP-Digest-Context">
        <div className="DSP-Digest-Context-DLR">
          <h3>Data Last Refreshed</h3>
          <div
            className="DSP-Digest-Context-DLR-Day"
            style={{ display: "flex" }}
          >
            <p style={{ marginRight: "1em" }}>DLR Day:</p>
            <p>04-01-2020 Mon</p>
          </div>

          <div
            className="DSP-Digest-Context-DLR-BN"
            style={{ display: "flex" }}
          >
            <p style={{ marginRight: "1em" }}>DLR Batch Num:</p>
            <p>PUSUB-12345</p>
            <p>PHXYE-123</p>
          </div>
        </div>

        <div className="DSP-Digest-Context-DailyPerformance">
          <h3>Daily Performance</h3>
          <p>Total Assigned Parcels:</p>
          <p>Total In-Transit Parcels:</p>
          <div
            className="DSP-Digest-Context-DailyPerformance-DriverSpec"
            style={{ height: 300, width: "100%" }}
          >
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};
