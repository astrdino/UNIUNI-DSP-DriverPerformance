import React, { useEffect, useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {decode} from 'base64-arraybuffer'
import * as XLSX from 'xlsx';

import { supabase } from '../../supabaseClient'







export const SPBS_Content = ()=>{

    const [file_RA, setFile_RA] = useState(null);
    const [file_OL, setFile_OL] = useState(null)
    const [file_OL_batchNum, setFile_OL_batchNum] = useState(null)

    const [selectedDate_OL,setSelectedDate_OL] = useState(null) //For Uploading Order List
    
    
    const [selectedDisplayDate, setSelectedDisplayDate] = useState(null)//For displaying Order List

    const [test, setTest] = useState(1);
    const [spbsLoggedIn, setspbsLoggedIn] = useState('');



    const [uploadBtnCount, setUploadBtnCount] = useState(1)

    //const [NEWEST_RdAsmnt, setNEWEST_RdAsmnt] = useState('')

    //const firstPageRedered = useRef({redered: true})


    useEffect(()=>{


      const mapIn = async () =>{

        if (!file_RA) {
          alert('Empty to Check');
          return;
        }

        
  
        if(file_RA.name === 'AZ Rd Assignment.xlsx'){
          //Get current date list from rd assignment
          try {
  
            // const {data, error} = await supabase.storage
            // .from('admin-data-bucket/Main')
            // .download(file.name)



            //Get Latest day from the givin rd assignment
            // Read the file as an ArrayBuffer
            const arrayBuffer = await file_RA.arrayBuffer();
              
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


    useEffect(()=>{
      const dateString = selectedDate_OL ? `${selectedDate_OL.getMonth() + 1}-${selectedDate_OL.getDate()}-${selectedDate_OL.getFullYear()}` : '';
      console.log(dateString)
    },[selectedDate_OL])


    useEffect(()=>{
      pullOutSingleOrderList()
    },[selectedDisplayDate])


    useEffect(()=>{
      const removeFromBucket = async () => {
        try {
            //1. Remove
            //2. Upload to Supabase Table
            //3. Map to Table
            let filePath = ''
    
            if(file_RA){
    
              filePath = `Main/${file_RA.name}`; 
              //Remove from DB
    
              let { data, error } = await supabase.storage
              .from('admin-data-bucket')
              .remove([filePath])
          
      
              if (error) {
                throw error;
              }
      
            
              alert('Removed');
      
    
            }
            else if(file_OL){
    
              if(file_OL.name === 'order_lists.xlsx'){
    
                var month = selectedDate_OL.getMonth() + 1
                month = month < 10 ? '0' + month : '' + month
    
                var date = selectedDate_OL.getDate()
                date = date < 10 ? '0' + date : '' + date
    
                filePath = `Main/${month}-${date}-${selectedDate_OL.getFullYear()}-order-lists.xlsx`; 
                


                //Remove from DB
    
                let { data, error } = await supabase.storage
                .from('admin-data-bucket')
                .remove([filePath])
            
        
                if (error) {
                  throw error;
                }
        
              
                alert('Removed');

                
              }else{
                alert("Not an order list")
                return
              }
    
              
    
            }
          
            
    
         
    
    
          
        } 
        catch (error) {
    
            console.error('Error when remove items:', error.message);
            alert(`Error when remove items: ${error.message}`);
            throw error
    
        
        }
    
        };
    
        const uploadFileToBucket = async () => {
          try {
      
      
           
      
              let filePath = ''
    
              if(file_RA){
    
                filePath = `Main/${file_RA.name}`; 
    
                let { data, error } = await supabase.storage
                .from('admin-data-bucket')
                .upload(filePath, file_RA, {
                  cacheControl: '3600'
                })
                if (error) {
                  throw error;
                }
    
                console.log('File uploaded:', data);
                alert('File uploaded successfully!');
    
    
              }
              else if(file_OL){
    
                //Manually format month/date digit
                var month = selectedDate_OL.getMonth() + 1
                month = month < 10 ? '0' + month : '' + month
    
                var date = selectedDate_OL.getDate()
                date = date < 10 ? '0' + date : '' + date
    
                filePath = `Main/${month}-${date}-${selectedDate_OL.getFullYear()}-order-lists.xlsx`; 
    
                
                
    
                let { data, error } = await supabase.storage
                .from('admin-data-bucket')
                .upload(filePath, file_OL, {
                  cacheControl: '3600'
                })
    
                if (error) {
                  throw error;
                }
    
                console.log('File uploaded:', data);
                alert('File uploaded successfully!');
    
              }
      
      
              
              
      
              
      
              
      
    
          } 
          catch (error) {
      
              console.error('Error during uploading:', error.message);
              alert(`Error during uploading: ${error.message}`);
              throw error
      
          
          }
      
        };
    
    
        const pullOutSingleOrderList = async () =>{
          try {
    
            console.log(`ready to fetch ${selectedDisplayDate}`)
            
            //Find sheet from the storage
            
          } catch (error) {
    
            alert(error.message)
            
          }
        }
    
    
    
        const Input_date_batch_MatchCheck = async () =>{
    
          try {
    
            console.log(file_OL_batchNum);
            const{data,error} = await supabase
            .from('AZ-RD_ASMT')
            .select()
            .eq('Batch_Number',file_OL_batchNum)
            
    
            if(error){
              throw error
            }
    
            if(data){
              console.log(data)
            }
            
          } catch (error) {
    
            alert(error.message)
            
          }
    
        }

      Input_date_batch_MatchCheck()
         
         
          
      // console.log(sol['C3']);

      removeFromBucket()
      uploadFileToBucket()
      
    },[file_OL_batchNum])







    const handleRAFileChange = (e) => {
        
        const file_RA = e.target.files[0];
        setFile_RA(file_RA);
        
    };

    const handleOLFileChange = (e) =>{

        const file_OL = e.target.files[0]
        setFile_OL(file_OL)
        

      
    }

    const HandleSelectedDisplayDateChange = (e) =>{

      const d = e.target.value
      // console.log(d)
      setSelectedDisplayDate(d)

      
    }

    const UPLOAD_RA_BTN_handle = async () =>{

      try {

        if(file_RA){
          await removeFromBucket();
          await uploadFileToBucket(); 

        }
        if(file_RA && file_RA.name === 'AZ Rd Assignment.xlsx'){

          setUploadBtnCount(uploadBtnCount + 1)

          

        }
       
        
        
      } catch (error) {

        alert(error)
        alert("Error thrown when click 'Upload RA' button")
        
      }

    }

    const UPLOAD_OL_BTN_handle = async () =>{

      try {

        if(file_OL && selectedDate_OL && file_OL.name === 'order_lists.xlsx'){


          //Inner Check if batch number in the sheet is match up to the date picker
          console.log(typeof(file_OL))

          

          var ol = await file_OL.arrayBuffer();
          const workbook = XLSX.read(ol, { type: 'buffer' });
         
          
          //Get batch number from the sheet
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const checkSpot = 'E3'; 
          
          
          setFile_OL_batchNum(worksheet[checkSpot].v)
          // console.log(worksheet[checkSpot].v);


       
        }
        else{
          if(!file_OL){
            alert('No Order List file selected');
            return;

          }
          else if(!selectedDate_OL){
            alert('No date selected for the order list');
            return;

          }
          else if(file_OL.name !== 'order_lists.xlsx'){
            alert('The file you would like to upload is not an order list')
            return
          }
          else{
            alert('Both date and file are not selected for the order list')
            return
          }
          
        }
        
      } catch (error) {


        alert(error.message)
        
      }

    }







    
    const removeFromBucket = async () => {
    try {
        //1. Remove
        //2. Upload to Supabase Table
        //3. Map to Table
        let filePath = ''

        if(file_RA){

          filePath = `Main/${file_RA.name}`; 


        }
        else if(file_OL){

          if(file_OL.name === 'order_lists.xlsx'){

            var month = selectedDate_OL.getMonth() + 1
            month = month < 10 ? '0' + month : '' + month

            var date = selectedDate_OL.getDate()
            date = date < 10 ? '0' + date : '' + date

            filePath = `Main/${month}-${date}-${selectedDate_OL.getFullYear()}-order-lists.xlsx`; 

          }else{
            alert("Not an order list")
            return
          }

          

        }
      
        

        //Remove from DB

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
      try {
  
  
       
  
          let filePath = ''

          if(file_RA){

            filePath = `Main/${file_RA.name}`; 

            let { data, error } = await supabase.storage
            .from('admin-data-bucket')
            .upload(filePath, file_RA, {
              cacheControl: '3600'
            })
            if (error) {
              throw error;
            }

            console.log('File uploaded:', data);
            alert('File uploaded successfully!');


          }
          else if(file_OL){

            //Manually format month/date digit
            var month = selectedDate_OL.getMonth() + 1
            month = month < 10 ? '0' + month : '' + month

            var date = selectedDate_OL.getDate()
            date = date < 10 ? '0' + date : '' + date

            filePath = `Main/${month}-${date}-${selectedDate_OL.getFullYear()}-order-lists.xlsx`; 

            
            

            let { data, error } = await supabase.storage
            .from('admin-data-bucket')
            .upload(filePath, file_OL, {
              cacheControl: '3600'
            })

            if (error) {
              throw error;
            }

            console.log('File uploaded:', data);
            alert('File uploaded successfully!');

          }
  
  
          
          
  
          
  
          
  

      } 
      catch (error) {
  
          console.error('Error during uploading:', error.message);
          alert(`Error during uploading: ${error.message}`);
          throw error
  
      
      }
  
    };


    const pullOutSingleOrderList = async () =>{
      try {

        console.log(`ready to fetch ${selectedDisplayDate}`)
        
        //Find sheet from the storage
        
      } catch (error) {

        alert(error.message)
        
      }
    }



    const Input_date_batch_MatchCheck = async () =>{

      try {

        console.log(file_OL_batchNum);
        const{data,error} = await supabase
        .from('AZ-RD_ASMT')
        .select('Date')
        .eq('Batch_Number',file_OL_batchNum)

        if(error){
          throw error
        }

        if(data){
          console.log(data)
        }
        
      } catch (error) {

        alert(error.message)
        
      }

    }
  



        

  

    

    return(

        <>
        <div>
        <h2>General Upload</h2>
        <p>Don't upload two files at the same time</p>
        <div>
          <input type="file" onChange={handleRAFileChange} accept=".xls,.xlsx" />
          <button onClick={UPLOAD_RA_BTN_handle}>Upload Rd Assignment</button>
        </div>

        <div>
        
          <input type="file" onChange={handleOLFileChange} accept=".xls,.xlsx" />
          <DatePicker
          selected={selectedDate_OL}
          onChange={date => setSelectedDate_OL(date)}
          dateFormat="MM/dd/yyyy"
          isClearable
          placeholderText="Select a date for order list"
          />

          <button onClick={UPLOAD_OL_BTN_handle}>Upload Order List</button>
        </div>
       
        {/* <button onClick={UPLOAD_BTN_handle}>Upload DEVTEST</button> */}

        {/* <button onClick={()=>{
          setTest(test+1)
        }}>test</button> */}

        <select onChange={HandleSelectedDisplayDateChange}>
          <option>03/13/2024</option>
          <option>03/14/2024</option>
          <option>03/15/2024</option>
        </select>
        
        </div>

       {test}



        {/* <button onClick={mappingDateBatch}> Map Date/Batch</button> */}

        </>
    )

}

export default SPBS_Content