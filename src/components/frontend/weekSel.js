import React, { Component, useEffect, useState, useRef } from "react";

import DateTime from "../utility/dateTime";
import { format, subDays } from "date-fns";

//Frontend Components
import Button from "@mui/material/Button";
import { DatePicker, Space } from "antd";

const WeekSel = ({ selDay }) => {
  const [today, setToday] = useState(format(Date(), "MM-dd-yyyy"));
  const [selectedDisplayDate, setSelectedDisplayDate] = useState(null);

  const [datePickerSelected, setDatePickerSelected] = useState(null); //Date selected by the date picker
  const [currentDay, setCurrentDay] = useState("");
  const [previousWeek, setPreviousWeek] = useState([]);

  //Get Today,and the previous week in terms of useState()
  useEffect(() => {
    var days = []; //Store previous days from the target day

    if (datePickerSelected) {
      //If the day is selected from the date picker
      selDay(datePickerSelected); // Send data back to the according parent component
      setCurrentDay(datePickerSelected);
      setSelectedDisplayDate(null);

      days.push(datePickerSelected);
      for (let i = 1; i < 5; i++) {
        const day = subDays(datePickerSelected, i);

        days.push(format(day, "MM-dd-yyyy"));
      }
    } else {
      //Otherwise, today is the selcted day in defult

      var td = format(today, "MM-dd-yyyy");
      selDay(td); // Send data back to the according parent component
      setCurrentDay(td);
      setSelectedDisplayDate(td);

      days.push(td);

      for (let i = 1; i < 5; i++) {
        const day = subDays(today, i);

        days.push(format(day, "MM-dd-yyyy"));
      }
    }

    setPreviousWeek(days.reverse());
    //console.log(days);
    //console.log(days);
    //console.log(format(today, 'MM-dd-yyyy'));

    /* */
  }, [datePickerSelected]);

  const handleDaySel = (e) => {
    selDay(e.target.value); // Send data back to the according parent component
    setSelectedDisplayDate(e.target.value);
  };

  const datePickerChangeHandle = (date, dateString) => {
    if (date) {
      setDatePickerSelected(
        format(`${date["$M"] + 1}-${date["$D"]}-${date["$y"]}`, "MM-dd-yyyy")
      );
    } else {
      //Handle "Clear Date Pick"
      setDatePickerSelected(format(today, "MM-dd-yyyy"));
      selDay(format(today, "MM-dd-yyyy"));
    }
  };

  return (
    <>
      <div className={"WeekSel"}>
        {previousWeek.map((date, index) => (
          // <button >

          // </button>
          <Button
            variant="outlined"
            key={index}
            onClick={handleDaySel}
            value={date}
            style={{ color: "black" }}
          >
            {date}
          </Button>
        ))}
        <DatePicker onChange={datePickerChangeHandle} />
      </div>
    </>
  );
};

export default WeekSel;
