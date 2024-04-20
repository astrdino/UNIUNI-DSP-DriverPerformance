import React from "react";

import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
//Front-end
import Button from "@mui/material/Button";

function DSPMainPage() {
  var location = useLocation();

  // var data = null
  // if(location.state){

  //   if(location.state.selData){

  //   }

  // }
  //var data = location.state?.selData;
  var data = location.state?.userDSP;
  function gen218() {
    return <p>Fake List haha</p>;
  }

  return (
    <div className="DSP-COTNER">
      <h1>Hello, {data} </h1>
      <Button>Log out</Button>
      <p>Date </p>
      {gen218()}
    </div>
  );
}

export default DSPMainPage;
