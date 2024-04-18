import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

//Front end components
// import WeekWheel from "./weekWheel";
import WeekSel from "./weekSel";

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

  return (
    <div class={"Daily-TopBar"}>
      <div class={"Daily-TopBar-WeekSel"}>
        <WeekSel selDay={getDataFromChild}></WeekSel>
      </div>
      <div class={"Daily-TopBar-Digest"}>
        {/* <ul>
          <li>Date</li>
          <li>04-05-2024 Tue</li>
          <li>Batch Num:</li>
          <li>PHSUB-202404031121</li>
          <li>PHX-YE-20240403</li>
          <li>Today Finish Amt: 500</li>
          <li>Today Return Amt: 15</li>
        </ul> */}

        <h1>95%</h1>
      </div>
    </div>
  );
};

export default AdminMainTopBar;
