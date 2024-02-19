import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';
import { supabase } from '../driver-performance-react/src/supabaseClient';


//Fetch data from local directory
export const FetchData = () => {

//DATA
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExcelFile = async () => {
      const response = await fetch('/file/order_lists.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    //    if(worksheet) { // Assuming you meant 'A1'. Replace 'A1' with the correct cell reference if different
    //     setCell(worksheet['K1'].v); // Update state
    //   }

      const data = XLSX.utils.sheet_to_json(worksheet);
      // Filter data where service_number matches the pattern 211xx
      const filteredData = data.filter((row) => {
        const serviceNumber = row.service_number.toString();
        const state = row.state

        const serviceNumberMatches = /^21\d{3}$/.test(serviceNumber);
        // const stateMatches = state === 211 || state === 231 || state === 202;
        const success_stateMatches = state === 203
        return serviceNumberMatches && success_stateMatches;
      });

      setData(filteredData);


    };

    fetchExcelFile();
  }, []);

    
 

    return(
        <div>

            
            {data.length}


            {data.map((row, index) => (
            <div key={index}>
            {/* Display the filtered data */}
            {JSON.stringify(row.service_number)}
            </div>
            ))}

            

        </div>
    )
}

//Fetch data from Supabase
export const FetchData_SPBS = ()=>{

  const [data, setData] = useState([]);

  useEffect(()=>{

    const fetchExcelFile = async(fileName)=>{

      try {
        let {data, error} = await supabase.storage
        .from('admin-data-bucket')
        .download(fileName)
      } catch (error) {
        alert(`Error fetching or reading Excel file: ${error.toString()}`)
        console.error();
        return null;
        
      }

    }

    

  },[])


  return(
    <div>
    </div>
  )

}

export default FetchData