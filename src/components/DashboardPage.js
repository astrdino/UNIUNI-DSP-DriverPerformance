import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';

import axios from 'axios';

//Components
import DateTime from './utility/dateTime';
import WeekWheel from './frontend/weekWheel';
// import {FetchData} from './utility/fetchData';
import {FetchData_SPBS} from './utility/fetchData_SPBS';
import {SPBS_SignInForm} from './utility/SPBS_SignInForm'
import {SPBS_Upload} from './utility/SPBS_Upload'
import {FetchOrderDetail} from './utility/fetchOrderDetail'




import { supabase } from '../supabaseClient';
import { useUser} from "@supabase/auth-helpers-react";


//Frontend



import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';






function DashboardPage() {

  //Upload File
  /*
    1. Capture the file from the client end
    2. Send the file from the front end to the back end via API
    3. Handle the file on the server then move to static directory ('Public' Folder)
  
  */

  const [file, setFile] = useState(null);
  const [spbsLoggedIn, setspbsLoggedIn] = useState(false);



  
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)


  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFile(file);
  // };

 
  

  // const uploadFileToBucket = async () => {


  //   if (!file) {
  //     alert('No file selected');
  //     return;
  //   }

  //   try {
  //     // const user = supabase.auth.getUser();

  //     // if (!user) {
  //     //   console.error('User not authenticated');
  //     //   alert('User not authenticated. Please log in.');
  //     //   return;
  //     // }

     
  //     const filePath = `Main/${file.name}`; 

  //     let { data, error } = await supabase.storage
  //       .from('admin-data-bucket')
  //       .upload(filePath, file, {
  //         cacheControl: '3600',
  //         upsert: true,
  //       });

  //     if (error) {

  //       throw error;
  //     }

  //     console.log('File uploaded:', data);
  //     alert('File uploaded successfully!');
  //   } 
  //   catch (error) {

  //     console.error('Upsert error:', error.message);
  //     alert(`Upsert error: ${error.message}`);
  //     throw error

    
  //   }


    

  // };


  // const mappingDateBatch = async () =>{

  // }

  // const mappingDateBatch = async ()=>{

    

  //   if(file){

  //     try {

          
  //       const{data, error} = await supabase
  //       .from('AZ-RD_ASMT')
  //       .insert(
  //         [
  //           {
  //             id: 1, Date: '2024-01-01', Batch_Number: 'value3'
  //           }
  //         ]
  //       )  
        
       

  //       if(error){
  //         throw error
  //       }
        
  //     } catch (error) {

  //       alert("Failed to add rows to database")
  //       alert(error.message)
  //     }


  //     //

  //   }else{
  //     alert('NO File?')
  //   }
   
  // }


  const handleAuth_SignOut = async () =>{

    await supabase.auth.signOut()
    setspbsLoggedIn(false)

  }

    // setCurrentSessionUser("Inactive")


   





    
// }


  // const check = async() =>{

  //   const user = supabase.auth.getUser();

  //   if (user) {
  //     const { data, error } = await supabase.storage
  //       .from('admin-data-bucket')
        

  //     if (error) {
  //       console.error('Error fetching data:', error.message);
  //     } else {
  //       console.log('Data:', data);
  //     }
  //   } else {
  //     console.error('User not authenticated');
  //   }

  // }



// check()



  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     await axios.post('/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     alert('File uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     alert('Error uploading file');
  //   }
  // };


  const [childData, setChildData] = useState('');
  const getDataFromChild = (value) =>{
    setChildData(value)
  }



  return (
    <>

    {/* <div style={{backgroundColor: '#e9a32d'}}>

        
        
        
        


        

       

        <h2>Cloud Database Authentication</h2>

       

 
        

        

        

       
      
 
    </div> */}

    <div className='DSBD-COTNER' style={{ height: `${windowHeight}px` }}>

      <div className='DSBD-Info'>
        <div>
          <DateTime></DateTime>
        </div>
              
        <div>
          <a href='https://dispatch.uniuni.com/' target="_blank">Official Dispatch Map</a>
        </div>
        
        

        <div className='Admin-Dsbd-DataVsl-Info'>  
          <FetchData_SPBS></FetchData_SPBS>
        </div>

      </div>

      <div className='DSBD-Utility'>
      {
          spbsLoggedIn ? 

          <>
          <SPBS_Upload></SPBS_Upload> 

          <button onClick={handleAuth_SignOut}>Log Out Current Session</button>
          
          </>
          
          :   
          
          <SPBS_SignInForm spbsLoggedIn={spbsLoggedIn} setspbsLoggedIn={setspbsLoggedIn}></SPBS_SignInForm>
        }
      </div>

      <div className='DSBD-Main'>

        <div className='DSBD-Main-Left' style={{ height: `${windowHeight}px` }}>
        <div>

          <WeekWheel selDay = {getDataFromChild}></WeekWheel>
          {childData}
          <div className='Admin-Dsbd-DataVsl-Detail'> 

            <FetchOrderDetail selDayFromParent={childData}></FetchOrderDetail> 

          </div>
        </div>
        </div>
        <div className='DSBD-Main-Right' style={{ height: `${windowHeight}px` }}> <WeekWheel></WeekWheel></div>
       
        {/* <div className='DSBD-Main-DatePicker'>
          <div className='Admin-Dsbd-DataVsl-Detail'> 

            <FetchOrderDetail></FetchOrderDetail> 

          </div>

        </div> */}
        {/* <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div>
        <div className='DSBD-Main-DSP'>
          DSP

        </div> */}
      </div>

    </div>

      

 

   
    </>
  );
}

export default DashboardPage;
