import React, { Component, useEffect, useState, useRef } from "react";
import { format, subDays } from "date-fns";
//Front end
import Button from "@mui/material/Button";

//Auth
import { useAuth } from "../../AuthContext";
const DSP_Greetings = ({ DSPdata }) => {
  const [today, setToday] = useState(format(Date(), "MM-dd-yyyy eeee"));

  const { logout } = useAuth();

  return (
    <div className="DSP-Greeting">
      <h1>Hello, {DSPdata} </h1>
      <p style={{ marginLeft: ".5em" }}>{today} </p>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
};

export default DSP_Greetings;
