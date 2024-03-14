

//Not Applying


import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

// import {CopyIcon} from './COPY_icon'

import * as XLSX from 'xlsx';
import { supabase } from '../../supabaseClient';

//Fetch data from Supabase
export const FetchData_SPBS = ()=>{

    const [CloudData, setCloudData] = useState([]);
    const [latestDate, setLatestDate] = useState()
    const [latestBatch, setLatestBatch] = useState()


    // const [data, setData] = useState();

    useEffect(()=>{
  
      
  
      const fetchExcelFile = async()=>{
        
        //Production Deployment 
        //bucketName = 'public/admin-data-bucket/Main'
        
        //Local Server
        //bucketName = 'admin-data-bucket/Main'

        
        const bucketName = 'admin-data-bucket/Main'; 
        const fileName = 'AZ Rd Assignment.xlsx'; 
        // const fileName = 'order_lists.xlsx'; 
  
  
        
        
        try {
          const {data, error} = await supabase.storage
          .from(bucketName)
          .download(fileName)
  
          if (error) {
            throw error;
          }
      
          if (data) {


           
            
            console.log(data)


            // Read the file as an ArrayBuffer
            const arrayBuffer = await data.arrayBuffer();

            
            
            // Use XLSX to read the file
            const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      
            // Assuming you want to read the first sheet
            const worksheet = workbook.Sheets[workbook.SheetNames[1]]
            
            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);


            // const latst_date = workbook.SheetNames[1] 

            console.log(workbook.SheetNames)



            setLatestDate(workbook.SheetNames[1]) //The latest day for the road assignment in the cloud data
            setLatestBatch(worksheet['C3'].v)
            setCloudData(jsonData)
  
            
            return jsonData;
            // setData(worksheet['C3'].v)
          
          }
          else{
            console.log("nothing")
          }
  
  
  
        } catch (error) {
          alert(`Error fetching or reading Excel file: ${error.toString()}`)
          console.error();
          return null;
          
        }
  
      }


      // const fetchMainOrderList = async () =>{

      //   const bucketName = 'admin-data-bucket/Main'; 
      //   const rdAmnt_Name = 'AZ Rd Assignment.xlsx';
      //   // const rdAmnt_Name = 'AZ Rd Assignment.xlsx';

      //   try {
          
      //   } catch (error) {
          
      //   }

      // }
  
      fetchExcelFile()
  
    },[])
  
  
    return(
      // {data.map((row, index) => (
      //   <div key={index}>
      //   {/* Display the filtered data */}
      //   {JSON.stringify(row)}
      //   </div>
      // ))}
  
      // {data}

      <>
      
      <div>Latest Date: {latestDate}</div>
      
      <div>Latest Batch: {latestBatch}</div> 

      </>
      // <div>{CloudData.length}</div>
    )
  
  }

export default FetchData_SPBS