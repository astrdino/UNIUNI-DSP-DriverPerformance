import React, { Component, useEffect, useState, useRef } from "react";

//Front end
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import WeekSel from "../frontend/weekSel";

//Back end
import { supabase } from "../../supabaseClient";

//Utility
import findDSPbyDrID from "../utility/Roles";
export const DSP_DailyPerformance = ({ DSPname }) => {
  // Render Initialization Control
  const [allowEffect, setAllowEffect] = useState(false); // This state is used to control when to allow useEffect logic after two renders
  const renderCount = useRef(0);

  const [selctedDay, setselctedDay] = useState('04-21-2024"');
  const [selctedDayData, setSelctedDayData] = useState(null); // List of all orders in one day

  //Data for front end display

  const [DProws, setDProws] = useState([]); //Daily Performance front end display rows

  var columns: GridColDef[] = [
    { field: "col1", headerName: "Driver ID", width: 100 },
    { field: "col2", headerName: "Finish Amt", width: 150 },
  ];
  /*Render Initialization Prevention */
  // Apply this useEffect to update the ref after the first render
  useEffect(() => {
    renderCount.current += 1;

    // If the component has rendered more than twice, allow the useEffect logic
    if (renderCount.current > 1 && !allowEffect) {
      setAllowEffect(true);
    }
  }, []);

  /* Request Data From Supabase Storage */
  useEffect(() => {
    const fetchFromTable = async () => {
      try {
        var targetTableName = selctedDay + "-order-list";

        const { data, error } = await supabase
          .from(targetTableName)
          .select("*")
          .limit(8000);

        if (data) {
          // console.log(data);
          setSelctedDayData(data);
        } else if (error) {
          throw error;
        }

        // setDsbd_single_day(data);
      } catch (error) {
        alert("Failed to fetch data from supabase table");
        console.log(error.message);
      }
    };

    if (renderCount.current > 1 && allowEffect) {
      setDProws([]); //Clear display last-render-data cache
      fetchFromTable();
    }

    //pullOutSingleOrderList();
  }, [selctedDay]);

  //Data Clustering
  useEffect(() => {
    if (renderCount.current > 1 && allowEffect) {
      console.log(`print ${DSPname} for me`);

      //Different type of clustring
      var dailyDataByState = [];
      var dailyDataByDriver = [];

      if (selctedDayData) {
        for (let i = 0; i < selctedDayData.length; i++) {
          if (findDSPbyDrID(selctedDayData[i]["service_number"]) === DSPname) {
            const stateKey = selctedDayData[i]["state"];
            const driverKey = selctedDayData[i]["service_number"];

            if (!dailyDataByState[stateKey]) {
              dailyDataByState[stateKey] = [];
            }

            if (!dailyDataByDriver[driverKey]) {
              dailyDataByDriver[driverKey] = [];
            }

            dailyDataByState[stateKey].push(selctedDayData[i]);
            dailyDataByDriver[driverKey].push(selctedDayData[i]);
          }
        }

        console.log(dailyDataByState);
        console.log(dailyDataByDriver);

        // Map data to front end display rows
        const newDProws = [...DProws]; //Must to use new array to accumulate changes to avoid asyn call set with the for loop
        var dlist = Object.keys(dailyDataByDriver); //["12543",'12321",...]
        for (let i = 0; i < dlist.length; i++) {
          const driver = {
            id: i + 1,
            col1: dlist[i],
            col2: dailyDataByDriver[dlist[i]].length,
          };
          newDProws.push(driver); // Accumulate data into the new array
        }
        setDProws(newDProws);
      }
    }
  }, [selctedDayData]);

  return (
    <div className="DSP-DailyPerformance">
      <h3>{DSPname} - Daily Performance</h3>
      <WeekSel
        selDay={(day) => {
          setselctedDay(day);
        }}
      />
      <p>Total Assigned Parcels:</p>
      <p>Total In-Transit Parcels:</p>

      {DProws.length > 0 ? (
        <DataGrid
          rows={DProws}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      ) : (
        <div />
      )}
    </div>
  );
};
