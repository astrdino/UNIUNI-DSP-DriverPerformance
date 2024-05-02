import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//Front end

//Back end
import emailjs from "emailjs-com";
import * as XLSX from "xlsx";
import findRolesbyID, { findEmailbyDSP } from "../../components/utility/Roles";
import emitter from "../emitter";

//Data
var local_stateCtrlList = [];
var ready2SendList = [];

let dsp_ready2SendList = {};

export var showConfirm = "false";

export const sendEmail = (e) => {
  // const [formData, setFormData] = useState();
  //API config and launch emails
  // e.preventDefault();
  // console.log(e.target);
  // emailjs
  //   .send(
  //     "UNIUNI_PHX_Email_Service",
  //     "218reminder_template",
  //     sendDataBag,
  //     "ALSMKl_G92GHPlJg2"
  //   )
  //   .then(
  //     (result) => {
  //       window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
  //     },
  //     (error) => {
  //       console.log(error.text);
  //     }
  //   );
};

export const readySendEmail = () => {
  //Making up data package to send email

  /**
   * filter by Driver ID
   * {
   * "12342": [[...],[...]...],
   * "32142": [[...],[...]...],
   * "12314": [[...],[...]...]
   * }
   *
   */
  const dvID_ready2SendList = ready2SendList.reduce((accum, order) => {
    const key = order[7]; //Use driverID as key

    if (!accum[key]) {
      accum[key] = [];
      // console.log(order);
    }

    accum[key].push(order);

    return accum;
  }, {});

  //console.log(dvID_ready2SendList);
  //filter by dsp
  let drList = Object.keys(dvID_ready2SendList); //Plain list, ['dsp1','dsp2',...]

  let final_standby_data = {};
  //Assign DSP name to according drivers
  for (let i = 0; i < drList.length; i++) {
    let dspName = findRolesbyID(drList[i]);
    let record = dvID_ready2SendList[dspName]; //according order list

    //If the dsp is not exsited
    if (!dsp_ready2SendList[dspName]) {
      dsp_ready2SendList[dspName] = {
        [`${drList[i]}`]: dvID_ready2SendList[drList[i]],
      };
      dsp_ready2SendList[dspName]["email"] = findEmailbyDSP(dspName);
    }

    //Secondary Level
    if (!dsp_ready2SendList[dspName][drList[i]]) {
      dsp_ready2SendList[dspName][`${drList[i]}`] =
        dvID_ready2SendList[drList[i]];
    }
  }

  console.log(dsp_ready2SendList);

  emitter.emit("activeChanged", true); //Applying emitter to output data which used to control a useState() value in the parent componentt

  // console.log(dvID_ready2SendList);
  // console.log(Object.keys(dvID_ready2SendList));
};

export const receiveFileHandle = (file) => {
  //Remove Cache
  showConfirm = "false";
  dsp_ready2SendList = {};

  const f = file.target.files[0]; //Get file
  // console.log(local_stateCtrlListt);
  console.log(f);
  if (f) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const list = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(list, { header: 1 }); // Convert the worksheet to JSON

      //console.log(local_stateCtrlList.length);

      if (local_stateCtrlList.length > 0) {
        jsonData.forEach((element) => {
          //Check each state in the stateCtrl list
          local_stateCtrlList.forEach((state) => {
            if (element.includes(state.value)) {
              ready2SendList.push(element);
              //console.log(element);
            }
          });
        });

        // return false;
      } else {
        //show error
        alert("choose your state");
      }
    };

    reader.readAsBinaryString(f);
  }
};

export const stateCheckHandle = (stateCtrlList) => {
  local_stateCtrlList = stateCtrlList; //Receive and send to the local variable
};

export const confirm2SendReminder = () => {
  const genMsg = (drivers, details) => {
    var MSG = "";
    for (let i = 0; i < drivers.length; i++) {
      //Each drivers
      // MSG += "#";
      // MSG += drivers[i];

      if (i === 0) {
        MSG = "Driver# ".concat(drivers[i], ", Unreturned Amount: ");
        MSG += details[i].length;
      } else {
        //More than one driver

        //MSG += drivers[i];
        MSG = MSG.concat("\nDriver# ", drivers[i], ", Unreturned Amount: ");

        MSG += details[i].length; //Add outstanding amount

        // MSG += details[i].length;
      }
    }

    return MSG;
  };

  //Sending email biubiubiu

  let DSPs = Object.keys(dsp_ready2SendList);
  let data = Object.values(dsp_ready2SendList);

  for (let i = 0; i < DSPs.length; i++) {
    let details = Object.values(data[i]).slice(0, -1); //As a list [[driver's orders],[driver's orders]...]
    let drivers = Object.keys(data[i]).slice(0, -1); // .slick() to remove attribute "email";

    console.log(drivers, details);

    var reportDetail = genMsg(drivers, details);

    //console.log(thisMsg);

    let thisDataBag = {
      to_name: DSPs[i],
      to_email: data[i]["email"],
      reportDetail: reportDetail,
    };
    emailjs
      .send(
        "UNIUNI_PHX_Email_Service",
        "218reminder_template",
        thisDataBag,
        "ALSMKl_G92GHPlJg2"
      )
      .then(
        (result) => {
          window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
};
