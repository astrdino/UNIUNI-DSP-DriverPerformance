import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
//Front-end
import Button from "@mui/material/Button";

import DSP_dsp from "./DSP/DSP_dsp";
import { DSP_DBstatus } from "./DSP/DSP_DBstatus";
import { DSP_drvrMangmntt } from "./DSP/DSP_drvrMangmnt";
import { DSP_DailyPerformance } from "./DSP/DSP_DailyPerformance";
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
      <DSP_dsp DSPdata={DSP} />
      <DSP_DBstatus />
      <DSP_DailyPerformance DSPname={DSP} />
      {DSP_Digest(DSP)}
      <DSP_DispatchAssign DSPdata={DSP}></DSP_DispatchAssign>
    </div>
  );
}

export default DSPMainPage;
