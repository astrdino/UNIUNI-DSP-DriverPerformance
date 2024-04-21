import React from "react";

import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
//Front-end
import Button from "@mui/material/Button";

import DSP_DispatchAssign from "./DSP/DSP_DispatchAssign";
import { DSP_Digest } from "./DSP/DSP_Digest";

function DSPMainPage() {
  var location = useLocation();
  var DSP = location.state?.userDSP; //Get Current DSP Name

  // function gen218() {
  //   return <p>Fake List haha</p>;
  // }

  return (
    <div className="DSP-COTNER">
      {DSP_Digest(DSP)}
      <DSP_DispatchAssign DPdPdata={DSP}></DSP_DispatchAssign>
    </div>
  );
}

export default DSPMainPage;
