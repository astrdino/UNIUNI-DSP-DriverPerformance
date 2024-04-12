import React, { Component, useEffect, useState, useRef } from "react";

import { format, subDays } from "date-fns";

//Components
import DateTime from "../utility/dateTime";

//Frontend
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const SidebarFunc = ({ sideBarState }) => {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const arrowHandle = () => {
    if (sideBarOpen) {
      sideBarState(false);
      setSidebarOpen(false);
    } else {
      sideBarState(true);
      setSidebarOpen(true);
    }
  };
  return (
    <>
      {sideBarOpen ? (
        <ArrowLeftIcon onClick={arrowHandle} />
      ) : (
        <ArrowRightIcon onClick={arrowHandle} />
      )}
    </>
  );
};

export default SidebarFunc;
