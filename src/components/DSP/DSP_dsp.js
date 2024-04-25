import React, { Component, useEffect, useState, useRef } from "react";
import { format, subDays } from "date-fns";
//Front end
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//Auth
import { useAuth } from "../../AuthContext";
const DSP_dsp = ({ DSPdata }) => {
  const [today, setToday] = useState(format(Date(), "MM-dd-yyyy eeee"));

  const { logout } = useAuth();

  const [dialog_open_asnmnt, setDialog_open_asnmnt] = useState(false);

  const handleDialogOpen_asnmnt = () => {
    setDialog_open_asnmnt(true);
  };

  const handleDialogClose_asnmnt = () => {
    setDialog_open_asnmnt(false);
  };

  const DMhandle = () => {};

  return (
    <>
      <div className="DSP-Greeting">
        <h1>Hello, {DSPdata} </h1>
        <p style={{ marginLeft: ".5em" }}>{today} </p>
        <Button onClick={DMhandle}>Driver Management</Button>
        <Button onClick={logout}>Log out</Button>
      </div>
      <Dialog
        open={dialog_open_asnmnt}
        onClose={handleDialogClose_asnmnt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Schedule Assignment"}
        </DialogTitle>
        <DialogContent style={{ display: "grid" }}>
          <div>
            <p>Schdule Day: 04-35-3035 </p>
            <p>Estimated Volume: 34</p>
          </div>

          <div style={{ marginBottom: "1em" }}>{dialogCmpnt}</div>
          <div style={{ display: "flex" }}>
            <AddBoxIcon onClick={addNewDriverHandle}> </AddBoxIcon>Add Driver
          </div>
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
          <Button onClick={handleDialogClose_asnmnt}>Cancel</Button>
          <Button
            onClick={() => {
              handleDialogClose_asnmnt();
            }}
            autoFocus
          >
            Send
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default DSP_dsp;
