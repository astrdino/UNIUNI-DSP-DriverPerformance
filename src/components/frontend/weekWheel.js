import React, { Component, useEffect, useState, useRef } from "react";

import { format, subDays } from "date-fns";

//Components
import DateTime from "../utility/dateTime";

//Frontend
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Button from "@mui/material/Button";

const WeekWheel = ({ selDay }) => {
  const [today, setToday] = useState(format(Date(), "MM-dd-yyyy"));

  //Custom Frontend Component
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [selectedDisplayDate, setSelectedDisplayDate] = useState(null); //For displaying Order List
  const [currentDay, setCurrentDay] = useState("");
  const [previousWeek, setPreviousWeek] = useState([]);

  //Get Today,and the previous week in terms of useState()
  useEffect(() => {
    // const today = new Date();

    setCurrentDay(format(today, "MM-dd-yyyy"));
    setSelectedDisplayDate(format(today, "MM-dd-yyyy"));

    //const startOfThisWeek = startOfWeek(today);
    const days = [format(today, "MM-dd-yyyy")];

    for (let i = 1; i <= 5; i++) {
      const day = subDays(today, i);
      days.push(format(day, "MM-dd-yyyy"));
    }

    setPreviousWeek(days.reverse());
    //console.log(days);
    //console.log(format(today, 'MM-dd-yyyy'));

    /* */
  }, []);

  // useEffect(() => {
  //   const today = new Date();
  //   setSelectedDisplayDate(format(today, "MM-dd-yyyy"));
  //   // selDay(selectedDisplayDate);
  // }, [selectedDisplayDate]);

  //
  const sendSelDay = () => {
    // Send data back to the parent
    //selDay(selectedDisplayDate);
  };

  //
  const handleDaySel = (e) => {
    //console.log("open");

    //console.log(`from ${selectedDisplayDate}`);

    selDay(e.target.value); // Send data back to the parent
    setSelectedDisplayDate(e.target.value);

    // console.log(e.target.value);
  };

  const nextWeekPrd = () => {};

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowLeftIcon />
        {/* <Item onClick={()=>{
              console.log("ay")
            }}>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
            <Item>Item 5</Item> */}

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
        <ArrowRightIcon onClick={nextWeekPrd} />
      </Stack>
      Current Selected Day: {selectedDisplayDate}
      {/* <button onClick={sendSelDay}>Send Data to Parent</button> */}
    </>
  );
};

export default WeekWheel;
