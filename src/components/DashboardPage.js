import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';

import axios from 'axios';

//Components
import DateTime from './utility/dateTime';
import {FetchData} from './utility/fetchData';
import {FetchData_SPBS} from './utility/fetchData_SPBS';
import {SPBS_SignInForm} from './utility/SPBS_SignInForm'
import {SPBS_Content} from './utility/SPBS_Content'




import { supabase } from '../supabaseClient';
import { useUser} from "@supabase/auth-helpers-react";

function DashboardPage() {

  //Upload File
  /*
    1. Capture the file from the client end
    2. Send the file from the front end to the back end via API
    3. Handle the file on the server then move to static directory ('Public' Folder)
  
  */

  const [file, setFile] = useState(null);
  const [spbsLoggedIn, setspbsLoggedIn] = useState(false);






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


  return (
    <>

    <div style={{backgroundColor: '#e9a32d'}}>

        <h1>Dashboard</h1>
        
        
        <DateTime></DateTime>

        <div>
          <a href='https://dispatch.uniuni.com/' target="_blank">Official Dispatch Map</a>
        </div>
        
        

        <div className='Admin-Dsbd-DataVsl'>  
          <FetchData_SPBS></FetchData_SPBS>
        </div>

        <h2>Cloud Database Authentication</h2>

        {
          spbsLoggedIn ? 

          <>
          <SPBS_Content></SPBS_Content> 

          <button onClick={handleAuth_SignOut}>Log Out Current Session</button>
          
          </>
          
          :   
          
          <SPBS_SignInForm spbsLoggedIn={spbsLoggedIn} setspbsLoggedIn={setspbsLoggedIn}></SPBS_SignInForm>
        }

        

        

        

       
      
 
    </div>

      

 

   
    </>
  );
}

export default DashboardPage;
