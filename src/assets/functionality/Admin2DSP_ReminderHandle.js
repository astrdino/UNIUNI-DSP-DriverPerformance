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

// function sendReminder() {
//   function sendEmail(e) {
//     e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

//     emailjs
//       .sendForm(
//         "UNIUNI_PHX_Email_Service",
//         "218reminder_template",
//         e.target,
//         "ALSMKl_G92GHPlJg2"
//       )
//       .then(
//         (result) => {
//           window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   }

//   function test() {
//     console.log("wro");
//   }

//   sendEmail();

//   // var data = [
//   //   {
//   //     "DSP Name": "Top Car Yarde",
//   //     Drivers: [
//   //       {
//   //         "Driver ID": "21105",
//   //         Packages: [
//   //           {
//   //             "Tracking Number": "UUS12345",
//   //             State: "202",
//   //             "Dispatch Date": "04-12-2024",
//   //             "Dispatch Num": "04-12-2024",
//   //           },
//   //           {
//   //             "Tracking Number": "UUS12345",
//   //             State: "231",
//   //           },
//   //         ],
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     "DSP Name": "Haulblaze",
//   //     Drivers: [
//   //       {
//   //         "Driver ID": "15289",
//   //         Packages: [
//   //           {
//   //             "Tracking Number": "UUS12345",
//   //             State: "202",
//   //           },
//   //           {
//   //             "Tracking Number": "UUS12345",
//   //             State: "211",
//   //           },
//   //         ],
//   //       },
//   //       {
//   //         "Driver ID": "15305",
//   //         Packages: [
//   //           {
//   //             "Tracking Number": "UUS12345",
//   //             State: "211",
//   //           },
//   //         ],
//   //       },
//   //     ],
//   //   },
//   // ];
//   // console.log(data[1]);

//   //Send data to DSP Main
// }

export const sendEmail = (e) => {
  // const [formData, setFormData] = useState();

  const sendData = {
    to_email: "dino.liang0609@gmail.com",
  };
  // e.preventDefault();
  // console.log(e.target);
  emailjs
    .send(
      "UNIUNI_PHX_Email_Service",
      "218reminder_template",
      sendData,
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
};

export const receiveFileHandle = (file) => {
  const f = file.target.files[0];
  console.log(f);

  if (f) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      //console.log(worksheet);
      // const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Convert the worksheet to JSON
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      jsonData.forEach((element) => {
        if (!element.includes(203)) {
          console.log(element);
        }
      });

      console.log(jsonData[2]);

      if (worksheet["C1"] !== undefined) {
        console.log(worksheet);
        console.log(worksheet["C1"].v);
      }
    };

    reader.readAsBinaryString(f);
  }
};

// export const sendEmail = (e) = >{
//   console.log(e);
// }
