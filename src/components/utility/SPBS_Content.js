import React, { useEffect, useState, useRef } from 'react'
import {decode} from 'base64-arraybuffer'
import * as XLSX from 'xlsx';

import { supabase } from '../../supabaseClient'







export const SPBS_Content = ()=>{

    const [file, setFile] = useState(null);
    
    const [test, setTest] = useState(1);
    const [spbsLoggedIn, setspbsLoggedIn] = useState('');



    const [uploadBtnCount, setUploadBtnCount] = useState(1)

    //const [NEWEST_RdAsmnt, setNEWEST_RdAsmnt] = useState('')

    //const firstPageRedered = useRef({redered: true})


    useEffect(()=>{


      const mapIn = async () =>{

        if (!file) {
          alert('Empty to Check');
          return;
        }

        
  
        if(file.name === 'AZ Rd Assignment.xlsx'){
          //Get current date list from rd assignment
          try {
  
            // const {data, error} = await supabase.storage
            // .from('admin-data-bucket/Main')
            // .download(file.name)



            //Get Latest day from the givin rd assignment
            // Read the file as an ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
              
            // Use XLSX to read the file
            const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
            


            //Iterate sheet until hitting the condition

            //If the db is empty, set to "cnt < MAX"

            for(let cnt = 1; cnt < 100; cnt++){

              const latestWorksheet = workbook.Sheets[workbook.SheetNames[cnt]]
              const latestDay_RA = workbook.SheetNames[cnt]
              const latestBatch_RA = latestWorksheet['C3'].v


              if(latestDay_RA.includes('2024')){

                //Filter the sheet not in 2024
                
                //Fetch data from cloud 
                const {data, error} = await supabase
                .from('AZ-RD_ASMT')
                .select('*')
                .eq("Date",latestDay_RA)


                if(error){
                  throw error
                }
      
                if(data.length > 0){
    
                    
                  console.log('Updated')
                  break
                }
                else{
    
                  console.log("Updating Needed")
    
                  console.log(latestBatch_RA,latestDay_RA)
    
                  //DB Insertion

                  if(latestBatch_RA.includes('(!)')){
                    //Filter non-dispatching date

                    //Remove specifier in the batch number
                    let newBatch = latestBatch_RA.replace('(!)','')

                    const{data: insertion, error: insertion_error} = await supabase
                    .from('AZ-RD_ASMT')
                    .insert(
                      [
                        {
                          Date: latestDay_RA, Batch_Number: newBatch, Dispatching_Status: false
      
                        }
                      ]
                    )  

                    
                    if(insertion_error){
        
                      console.log(insertion_error);
                      throw insertion_error
                    }
                  
      
                    

                  }else{
                    const{data: insertion, error: insertion_error} = await supabase
                    .from('AZ-RD_ASMT')
                    .insert(
                      [
                        {
                          Date: latestDay_RA, Batch_Number: latestBatch_RA
      
                        }
                      ]
                    ) 

                    
                    if(insertion_error){
        
                      console.log(insertion_error);
                      throw insertion_error
                    }
                  
      
                  }

    
                }

              }
              else{
                break
              }


              

              

            }
           
            
            

            

            
            
            
          } 
          catch (error) {

            alert(error.message)
  
            
          }

        }
  
  
      }

      if(uploadBtnCount > 1){

        mapIn()

      }

      

    },[uploadBtnCount])







    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
      };




    
    const removeFromBucket = async () => {


    if (!file) {
        alert('No file selected');
        return;
    }

    try {
        //1. Remove
        //2. Upload to Supabase Table
        //3. Map to Table

        const filePath = `Main/${file.name}`; 


        //1. Remove from DB

        let { data, error } = await supabase.storage
        .from('admin-data-bucket')
        .remove([filePath])
    

        if (error) {
          throw error;
        }

       
        alert('Removed');


      
    } 
    catch (error) {

        console.error('Error when remove items:', error.message);
        alert(`Error when remove items: ${error.message}`);
        throw error

    
    }

    };

    const uploadFileToBucket = async () => {


      if (!file) {
          alert('No file selected');
          return;
      }
  
      try {
  
  
          //1. Remove
          //2. Upload to Supabase Table
          //3. Map to Table
  
          const filePath = `Main/${file.name}`; 
  
  
          //1. Remove from DB
  
          let { data, error } = await supabase.storage
          .from('admin-data-bucket')
          .upload(filePath, file, {
            cacheControl: '3600'
        });
          
  
          if (error) {
            throw error;
          }
  
          console.log('File uploaded:', data);
          alert('File uploaded successfully!');
  

      } 
      catch (error) {
  
          console.error('Error during uploading:', error.message);
          alert(`Error during uploading: ${error.message}`);
          throw error
  
      
      }
  
    };



  



        

    const UPLOAD_BTN_handle = async () =>{

      try {

        if(file){
          await removeFromBucket();
          await uploadFileToBucket(); 

        }
        if(file && file.name === 'AZ Rd Assignment.xlsx'){

          setUploadBtnCount(uploadBtnCount + 1)

          

        }
       
        
        
      } catch (error) {
        
      }

    }
    

    return(

        <>
        <div>
        <h2>General Upload</h2>
        <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />

        <button onClick={UPLOAD_BTN_handle}>Upload</button>
        {/* <button onClick={UPLOAD_BTN_handle}>Upload DEVTEST</button> */}

        {/* <button onClick={()=>{
          setTest(test+1)
        }}>test</button> */}
        </div>

       



        {/* <button onClick={mappingDateBatch}> Map Date/Batch</button> */}

        </>
    )

}

export default SPBS_Content