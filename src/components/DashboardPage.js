import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";

import axios from "axios";

//Components
import DateTime from "./utility/dateTime";
import SidebarFunc from "./frontend/sidebarFunction";
import WeekWheel from "./frontend/weekWheel";
// import {FetchData} from './utility/fetchData';
import { FetchData_SPBS } from "./utility/fetchData_SPBS";
import { SPBS_SignInForm } from "./utility/SPBS_SignInForm";
import { SPBS_Upload } from "./utility/SPBS_Upload";
import { FetchOrderDetail } from "./utility/fetchOrderDetail";

import { supabase } from "../supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

//Frontend

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ResizableSidebar from "./frontend/resizableSideBar";
import MenuIcon from "@mui/icons-material/Menu";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import AdminMainTopBar from "./frontend/adminMainTopBar";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

function DashboardPage() {
  //Upload File
  /*
    1. Capture the file from the client end
    2. Send the file from the front end to the back end via API
    3. Handle the file on the server then move to static directory ('Public' Folder)
  
  */

  const [file, setFile] = useState(null);
  const [spbsLoggedIn, setspbsLoggedIn] = useState(false);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight); //
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(100); //Side Bar width (100 = 100%)
  const [sidebarWidth_cache, setSidebarWidth_cache] = useState(100); //Side Bar width cache

  const sideBarRef = useRef(null); // Access a side bar DOM element directly and store the DOM value

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  /*** Frontend Dynamic Control Variables ***/

  const [sb_ctxt_dsply, setSb_ctxt_dsply] = useState("none"); //Side bar context display

  window.addEventListener("resize", () => {
    //If the window resized, get the current width of the reference component, is the sidebar in this case
    if (sideBarRef.current) {
      console.log("resized", sideBarRef.current.offsetWidth);
      setSidebarWidth_cache(sideBarRef.current.offsetWidth);
    }
  }); //the event lisner if the window get sresize
  /**
   * Mouse Movement Resizing
   */

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((mouseMoveEvent) => {
    console.log("start", mouseMoveEvent.clientX);

    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    console.log("release", sidebarWidth_cache);
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      //console.log(mouseMoveEvent.clientX, sideBarRef.current.offsetWidth);
      //console.log(isResizing);
      if (isResizing) {
        // setSidebarWidth();
        if (mouseMoveEvent.clientX <= sidebarWidth_cache) {
          setSidebarWidth((mouseMoveEvent.clientX / sidebarWidth_cache) * 100);
          console.log(sideBarRef.current.offsetWidth);
          //console.log(mouseMoveEvent.clientX / sideBarRef.current.offsetWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    /**
     * Clean up functions below
     * Removes the "mousemove" event listener, ensuring that the resize function stops being called.
     * Removes the "mouseup" event listener, ensuring that the stopResizing function stops being called.
     */
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  //Mouse movement resizing ends

  /**Supabase User Handle */

  const handleAuth_SignOut = async () => {
    await supabase.auth.signOut();
    setspbsLoggedIn(false);
  };

  /**Supabase User Handle Ends */

  /** Left panel date selection  */

  const [childData, setChildData] = useState("");
  const getDataFromChild = (value) => {
    console.log("db", value);
    setChildData(value);
  };

  /***** */
  const [grid_layout_col, setGrid_layout_col] = useState("1/9"); //Sidebar
  const sideBarMenuHandle = () => {
    //Resizing logic goes here
    if (isSideBarOpen) {
      setGrid_layout_col("2/9");
      setIsSideBarOpen(false); //Side bar container
      setSb_ctxt_dsply("grid"); //Side bar context
    } else {
      setGrid_layout_col("1/9");
      setIsSideBarOpen(true);
      setSb_ctxt_dsply("none");
    }
  };

  const [isDoubleScreen, setIsDoubleScreen] = useState(true);
  const [grid_layout_col_ds, setGrid_layout_col_ds] = useState("1/2");

  const splitsreenHandle = () => {
    if (isDoubleScreen) {
      //close
      setGrid_layout_col_ds("1/3");
      setIsDoubleScreen(false);
    } else {
      //open
      setGrid_layout_col_ds("1/2");
      setIsDoubleScreen(true);
    }
  };

  //Front end components generation
  function conditionalClass_DSBD_Main() {
    //Conditions for "Open/Off" the side bar
    const className = isSideBarOpen ? "DSBD-Main__open" : "DSBD-Main";
    return (
      <div className={className} style={{ gridColumn: `${grid_layout_col}` }}>
        <div
          className="DSBD-Main-Left"
          style={{
            height: `${windowHeight}px`,
            gridColumn: `${grid_layout_col_ds}`,
          }}
        >
          <div className="DSBD-Main-TopBar">
            <AdminMainTopBar day2Parent={getDataFromChild} />
          </div>

          {/* <WeekWheel selDay={getDataFromChild}></WeekWheel> */}

          <div className="DSBD-Main-Context">
            <FetchOrderDetail selDayFromParent={childData}></FetchOrderDetail>
          </div>
        </div>

        <div
          className="DSBD-Main-Right"
          style={{ height: `${windowHeight}px` }}
        >
          <WeekWheel></WeekWheel>
          {/* <button onClick={RightScreenCloseHandle}>Close</button> */}
        </div>

        {/* <div className='DSBD-Main-DatePicker'>
    <div className='Admin-Dsbd-DataVsl-Detail'> 

      <FetchOrderDetail></FetchOrderDetail> 

    </div>

  </div> */}
        {/* <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div>
  <div className='DSBD-Main-DSP'>
    DSP

  </div> */}
      </div>
    );
  }

  return (
    <>
      <div className="DSBD-COTNER" style={{ height: `${windowHeight}px` }}>
        <MenuIcon
          className="DSBD-MenuIcon"
          onClick={sideBarMenuHandle}
        ></MenuIcon>
        <SplitscreenIcon
          className="DSBD-SScreenIcon"
          onClick={splitsreenHandle}
        ></SplitscreenIcon>

        <div className="DSBD-Sidebar">
          {/* <div className="DSBD-Sidebar-Control">
            <SidebarFunc sideBarState={getSidebarState} />
          </div> */}

          <Sidebar
            className={"DSBD-Sidebar-Context"}
            style={{ display: `${sb_ctxt_dsply}` }}
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup
                style={{
                  paddingTop: "20em",
                  // paddingBottom: "20em",
                }}
              >
                <Sidebar.Item href="#" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                {/* <Sidebar.Item href="#" icon={HiViewBoards} labelColor="dark">
                  Fetch
                </Sidebar.Item> */}
                <Sidebar.Item href="#" icon={HiInbox}>
                  Fetch
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Fetch
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>

          <div className="DSBD-Sidebar-Info">
            <div>
              <DateTime></DateTime>
            </div>

            <div>
              <a href="https://dispatch.uniuni.com/" target="_blank">
                Official Dispatch Map
              </a>
            </div>

            <div className="Admin-Dsbd-DataVsl-Info">
              <FetchData_SPBS></FetchData_SPBS>
            </div>
          </div>
          <div
            className="DSBD-Sidebar-Utility"
            ref={sideBarRef}
            style={{ width: `${sidebarWidth}%` }}
            onMouseDown={startResizing}
          >
            {spbsLoggedIn ? (
              <>
                <SPBS_Upload></SPBS_Upload>

                <button onClick={handleAuth_SignOut}>
                  Log Out Current Session
                </button>
              </>
            ) : (
              <SPBS_SignInForm
                spbsLoggedIn={spbsLoggedIn}
                setspbsLoggedIn={setspbsLoggedIn}
              ></SPBS_SignInForm>
            )}
          </div>
        </div>

        {conditionalClass_DSBD_Main()}
      </div>
    </>
  );
}

export default DashboardPage;
