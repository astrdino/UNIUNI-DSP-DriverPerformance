import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//Front End
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
const DSP_DispatchAssign = ({ DPdPdata }) => {
  const [dialog_open_asnmnt, setDialog_open_asnmnt] = useState(false);

  const handleDialogOpen_asnmnt = () => {
    setDialog_open_asnmnt(true);
  };

  const handleDialogClose_asnmnt = () => {
    setDialog_open_asnmnt(false);
  };

  const addNewDriverHandle = () => {};

  return (
    <div className="DSP-NewDisplatch">
      <h3>Schedule New Dispatch</h3>
      <button onClick={handleDialogOpen_asnmnt}>
        Assignment for "next day" {DPdPdata}
      </button>
      <Dialog
        open={dialog_open_asnmnt}
        onClose={handleDialogClose_asnmnt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Schedule Assignment"}
        </DialogTitle>
        <DialogContent style={{ display: "grid" }}>
          Schdule Day: 04-35-3035
          <div style={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Driver" variant="standard" />
            </Box>{" "}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AssignmentReturnIcon></AssignmentReturnIcon>
              <TextField
                id="input-with-sx"
                label="Assign Range"
                variant="standard"
              />
              -
              <TextField id="input-with-sx" label="" variant="standard" />
            </Box>
          </div>
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
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DSP_DispatchAssign;
