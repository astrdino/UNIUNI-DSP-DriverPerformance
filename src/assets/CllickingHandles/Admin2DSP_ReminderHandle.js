import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//Front-END

export const SendReminder = () => {
  /**
   * 1. Collect today dispatch number
   * 2. selected day
   * 3.
   */

  var data = [
    {
      "DSP Name": "Top Car Yarde",
      Drivers: [
        {
          "Driver ID": "21105",
          Packages: [
            {
              "Tracking Number": "UUS12345",
              State: "202",
              "Dispatch Date": "04-12-2024",
              "Dispatch Num": "04-12-2024",
            },
            {
              "Tracking Number": "UUS12345",
              State: "231",
            },
          ],
        },
      ],
    },
    {
      "DSP Name": "Haulblaze",
      Drivers: [
        {
          "Driver ID": "15289",
          Packages: [
            {
              "Tracking Number": "UUS12345",
              State: "202",
            },
            {
              "Tracking Number": "UUS12345",
              State: "211",
            },
          ],
        },
        {
          "Driver ID": "15305",
          Packages: [
            {
              "Tracking Number": "UUS12345",
              State: "211",
            },
          ],
        },
      ],
    },
  ];
  console.log(data[1]);

  //Send data to DSP Main
};
