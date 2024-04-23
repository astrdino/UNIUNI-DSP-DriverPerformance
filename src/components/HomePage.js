import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import DateTime from "./utility/dateTime";
import FetchData from "./utility/fetchData";

import { useTranslation } from "react-i18next";

//Fronend
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

//Utility
import { DSPs } from "./utility/Roles";

//Auth

import { useAuth } from "../AuthContext";

//External CSS
import "../App.css";

const HomePage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate(); // Send "Data Package" with "Navigate"
  const [selectedDSP_path, setSelectedDSP_path] = useState("");
  const [selectedDSP, setSelectedDSP] = useState(""); //Selected DSP Name

  // const [selDSP, setSelDSP] = useState(null); //Selected DSP

  //Front-end Display
  // const DSP = [
  //   "Top Car Yarde",
  //   "Haulblaze",
  //   "Acadia",
  //   "DEL",
  //   "Desert",
  //   "L Dan",
  //   "Get Ya Roll",
  // ];

  //Force Logout
  useEffect(() => {
    logout();
  });

  const handleChange = (event, child) => {
    var sel = child["props"]["sel-value"]; //Selected Name
    const path = event.target.value; //Application Path
    // console.log(path);
    console.log(sel);
    console.log(path);
    setSelectedDSP_path(path);
    setSelectedDSP(sel);

    // Navigate to the selected component's route
    navigate(path, { state: { selData: sel } });
  };

  // const [age, setAge] = React.useState("");

  // const handleChangeT = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <div className="APP-OUTER">
      <div className="APP-MIDDLE">
        <div className="APP-COTNER">
          <div className="APP-Header">
            <h1>Oasis PHX</h1>
          </div>

          <div className="APP-Time">
            <DateTime></DateTime>
          </div>

          <div className="Home-Login">
            {/* <Button 
                component = {Link}
                to = 'login'
                variant="contained">Login as Admin</Button> */}

            <Box>
              <FormControl sx={{ display: "flex" }} size="small">
                <InputLabel id="demo-simple-select-label">Login</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedDSP_path}
                  label="DSP"
                  onChange={handleChange}
                >
                  <MenuItem component={Link} to="login" key={0}>
                    PHX Warehouse
                  </MenuItem>
                  {DSPs.map((DSP, index) => (
                    <MenuItem
                      value="/DSPMain"
                      sel-value={DSP.name}
                      key={index + 1}
                    >
                      {DSP.name}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value="/DSPMain">Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          </div>

          {/* <Link to="/login">Login as Admin</Link>  */}
          {/* <Link to="/DSPLogin">Login as DSP</Link>  */}

          {/* <div>
      <select onChange={handleChange} value={selectedDSP}>
        <option value="">Select a Component</option>
        <option value="/DSPMain">DSP @ 1</option>
        <option value="/DSPMain">DSP @ 2</option>
        
      
      </select>
      
  
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
