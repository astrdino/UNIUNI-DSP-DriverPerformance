import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

import * as XLSX from 'xlsx';





export const SPBS_Content = ()=>{

    const [file, setFile] = useState(null);
    const [spbsLoggedIn, setspbsLoggedIn] = useState('');

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
        // const user = supabase.auth.getUser();

        // if (!user) {
        //   console.error('User not authenticated');
        //   alert('User not authenticated. Please log in.');
        //   return;
        // }

        
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
    } 
    catch (error) {

        console.error('Upsert error:', error.message);
        alert(`Upsert error: ${error.message}`);
        throw error

    
    }

    };


    const mappingDateBatch = async ()=>{

    

        if(file && file.name === 'AZ Rd Assignment.xlsx'){

           
    
          try {

            //!!!In default, the data mapping is called after latest Rd Assignment uploading

            const bucketName = 'admin-data-bucket/Main'; 
            const fileName = 'AZ Rd Assignment.xlsx'; 

            let {NEWEST_RdAsmnt, NEWEST_RdAsmnt_Error} = await supabase.storage
            .from(bucketName)
            .download(fileName)


            console.log(NEWEST_RdAsmnt)

            if(NEWEST_RdAsmnt_Error){
                throw error
            }


            console.log("????")
            console.log(NEWEST_RdAsmnt)
            console.log(NEWEST_RdAsmnt_Error)
            

            if(NEWEST_RdAsmnt){


                //Get DataSheet
                const arrayBuffer = await NEWEST_RdAsmnt.arrayBuffer()

                // Use XLSX to read the file
                const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
        
                // Assuming you want to read the first sheet
                const worksheet = workbook.Sheets[workbook.SheetNames[1]]


                console.log(worksheet)

            }

            

            


            // const NEWEST_D_This = worksheet.SheetNames[1] //Latest Day Record in THIS Rd Assignment
            // const NEWESR_B_This = worksheet['C3'].v


            
    
            //DB Insertion
            const{data, error} = await supabase
            .from('AZ-RD_ASMT')
            .insert(
              [
                {
                  id: 1, Date: '2024-01-01', Batch_Number: 'value3'

                }
              ]
            )  
            
           
    
            if(error){
              throw error
            }
            
          } catch (error) {
    
            alert("Failed to add rows to database")
            alert(error.message)
          }
    
    
          //
    
        }else{
          alert('NO File?')
        }
       
      }
    

    return(

        <>
        <div>
        <h2>General Upload</h2>
        <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
        {/* <button onClick={uploadFileToBucket}>Upload</button> */}
        <button onClick={async()=>{

          try {
            await uploadFileToBucket(); 
            mappingDateBatch()
            
          } catch (error) {

            alert('Error in funcitons when click Upload')
            
          }
        }}>Upload</button>
        </div>

        <button onClick={mappingDateBatch}> Map Date/Batch</button>

        </>
    )

}

export default SPBS_Content