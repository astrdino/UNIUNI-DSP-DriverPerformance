import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//Front end components

import WeekSel from "./weekSel"; // import WeekWheel from "./weekWheel";

import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import InvoiceIcon from "@material-ui/icons/Receipt";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

//Back End
import { SendReminder } from "../../assets/CllickingHandles/Admin2DSP_ReminderHandle";

const AdminMainTopBar = ({ selDay, day2Parent }) => {
  const [childData, setChildData] = useState(""); //Receive data from the child component
  const getDataFromChild = (value) => {
    //Receiving data from the child component
    setChildData(value);
  };

  const [THIS_SelDay, setTHIS_SelDay] = useState(null);

  useEffect(() => {
    //Once obtaining "date" from the child component, send it to the parent component
    day2Parent(childData);
  }, [childData]);

  //218 Dialog
  const [dialog_open, setDialog_open] = useState(false);

  //218 Dialog
  const handleDialogOpen = () => {
    setDialog_open(true);
  };

  const handleDialogClose = () => {
    setDialog_open(false);
  };

  return (
    <div class={"Daily-TopBar"}>
      <div class={"Daily-TopBar-WeekSel"}>
        <WeekSel selDay={getDataFromChild}></WeekSel>
      </div>

      <div class={"Daily-TopBar-Side"}>
        <div class={"Daily-TopBar-Side-Utility"}>
          <AlarmOffIcon
            fontSize="large"
            onClick={handleDialogOpen}
          ></AlarmOffIcon>
          <MoneyOffIcon fontSize="large"></MoneyOffIcon>
          <InvoiceIcon fontSize="large"></InvoiceIcon>
          <Dialog
            open={dialog_open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"218 Reminder"}</DialogTitle>
            <DialogContent style={{ display: "grid" }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload
                <input
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={() => {
                    console.log("Ww");
                  }}
                />
              </Button>

              <FormControlLabel
                control={
                  <Switch
                    // checked={state.jason}
                    // onChange={handleChange}
                    name="jason"
                  />
                }
                label="Email DSP"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleDialogClose();
                  SendReminder();
                }}
                autoFocus
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>

          {/* <button> Outstanding Package</button> */}
        </div>
        <div class={"Daily-TopBar-Side-Digest"}>
          <h1>95%</h1>
        </div>

        {/* <div> class</div> */}
      </div>
    </div>
  );
};

export default AdminMainTopBar;
