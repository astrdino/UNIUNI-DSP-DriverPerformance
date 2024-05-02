import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//front end
import { Sidebar } from "flowbite-react";
import { UploadDialog } from "./uploadDialog";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import Button from "@mui/material/Button";
export const MySidebar = ({ sbCtxtDsply }) => {
  //Upload Dialog Control
  const [uploadDialog_open, setUploadDialog_open] = useState(false);
  const handleUploadDialogOpen = () => {};

  const handleUploadDialogClose = () => {
    setUploadDialog_open(false);
  };

  return (
    <>
      <Sidebar
        className={"DSBD-Sidebar-Context"}
        style={{ display: `${sbCtxtDsply}` }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup
            style={{
              paddingTop: "10em",
              // paddingBottom: "20em",
            }}
          >
            <Sidebar.Item href="/" icon={HiChartPie}>
              <Button> Home</Button>
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiChartPie}>
              <Button>Dashboard</Button>
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser}>
              <Button
                onClick={() => {
                  setUploadDialog_open(true);
                }}
              >
                Upload
              </Button>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              <Button>Upload</Button>
            </Sidebar.Item>
            <Sidebar.Item href="/" icon={HiArrowSmRight}>
              <Button>Back</Button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <UploadDialog
        setDsplyOpen={uploadDialog_open}
        setDsplyClose={() => {
          setUploadDialog_open(false);
        }}
      ></UploadDialog>
    </>
  );
};
