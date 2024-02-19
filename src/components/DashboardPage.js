import React, { Component, useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';
import DateTime from './utility/dateTime';
import FetchData from './utility/fetchData';

import axios from 'axios';

import { supabase } from '../supabaseClient';

function DashboardPage() {

  //Upload File
  /*
    1. Capture the file from the client end
    2. Send the file from the front end to the back end via API
    3. Handle the file on the server then move to static directory ('Public' Folder)
  
  */

  const [file, setFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };


  

  const uploadFileToBucket = async () => {


    if (!file) {
      alert('No file selected');
      return;
    }

    try {
      const user = supabase.auth.getUser();

      if (!user) {
        console.error('User not authenticated');
        alert('User not authenticated. Please log in.');
        return;
      }

      // Replace 'Main/${file.name}' with your desired path within the storage bucket
      const filePath = `Main/${file.name}`; 
      let { data, error } = await supabase.storage
        .from('admin-data-bucket')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded:', data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error.message);
      alert(`Upload error: ${error.message}`);
    }
  };


  const check = async() =>{

    const user = supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.storage
        .from('admin-data-bucket')
        

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.log('Data:', data);
      }
    } else {
      console.error('User not authenticated');
    }

  }

  useEffect(() => {
    
}, []);

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
    <div>
      <h1>Dashboard</h1>
      <p>Date </p>
      <div>
            <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
            <button onClick={uploadFileToBucket}>Upload</button>
      </div>
      <FetchData></FetchData>
    </div>
  );
}

export default DashboardPage;
