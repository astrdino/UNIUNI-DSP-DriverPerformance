import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//front end
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

//back end
import { SPBS_SignInForm } from "../utility/SPBS_SignInForm";
import { SPBS_Upload } from "../utility/SPBS_Upload";
import { supabase } from "../../supabaseClient";

export const UploadDialog = ({ setDsplyOpen, setDsplyClose }) => {
  const [spbsLoggedIn, setspbsLoggedIn] = useState(false);
  const handleAuth_SignOut = async () => {
    await supabase.auth.signOut();
    setspbsLoggedIn(false);
  };

  return (
    <Dialog open={setDsplyOpen}>
      {spbsLoggedIn ? (
        <>
          <SPBS_Upload></SPBS_Upload>

          <button onClick={handleAuth_SignOut}>Log Out Current Session</button>
        </>
      ) : (
        <SPBS_SignInForm
          spbsLoggedIn={spbsLoggedIn}
          setspbsLoggedIn={setspbsLoggedIn}
        ></SPBS_SignInForm>
      )}
      <Button onClick={setDsplyClose}>Close</Button>
    </Dialog>
  );
};
