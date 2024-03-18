import React, { useEffect, useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { format, startOfWeek, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import {decode} from 'base64-arraybuffer'
import * as XLSX from 'xlsx';

import { supabase } from '../../supabaseClient'
import { endOfTomorrow } from 'date-fns';







export const SPBS_Content = ()=>{

    // Render Initialization Control
    // This state is used to control when to allow useEffect logic after two renders
    const [allowEffect, setAllowEffect] = useState(false);
    const renderCount = useRef(0);

  

    const [file_RA, setFile_RA] = useState(null); //File type
    const [file_OL, setFile_OL] = useState(null)  //File type
    const [file_OL_batchNum, setFile_OL_batchNum] = useState(null)

    const [selectedDate_OL,setSelectedDate_OL] = useState(null) //For Uploading Order List
    const [checkPass,setCheckPass] = useState(false) //check pass for input day and recorded day
    const [check_OL_table, setCheck_OL_table] = useState(null)//String: "mm-dd-yyyy-order-lists", File name for chekcing if uploading order list has corresponding "supbase table" setup    
    const [checkPass_OL_table, setCheckPass_OL_table] = useState(null)//Bool: check pass for if uploading order list has corresponding "supbase table" setup 
    
    const [selectedDisplayDate, setSelectedDisplayDate] = useState(null)//For displaying Order List
    const [currentDay, setCurrentDay] = useState('');
    const [previousWeek, setPreviousWeek] = useState([]);



    const [test, setTest] = useState(1);
    const [spbsLoggedIn, setspbsLoggedIn] = useState('');



    const [uploadBtnCount, setUploadBtnCount] = useState(1)

    //const [NEWEST_RdAsmnt, setNEWEST_RdAsmnt] = useState('')

    //const firstPageRedered = useRef({redered: true})



    /*Render Initialization Round*/

    //Get Today,and the previous week in terms of useState()
    useEffect(()=>{
      const today = new Date();
      setCurrentDay(format(today, 'MM-dd-yyyy'));

      //const startOfThisWeek = startOfWeek(today);
        const days = [];
        for (let i = 1; i <= 7; i++) {
            const day = subDays(today, i);
            days.push(format(day, 'MM-dd-yyyy'));
        }

      setPreviousWeek(days);
      console.log(days);
      console.log(format(today, 'MM-dd-yyyy'));
    },[])




    // Apply this useEffect to update the ref after the first render
    useEffect(() => {
      renderCount.current += 1;

      // If the component has rendered more than twice, allow the useEffect logic
      if (renderCount.current > 1 && !allowEffect) {
        setAllowEffect(true);
      }
      
      
    }, []);




    //Road Assignment Mapping when file gets loaded
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
    
                  // console.log(latestBatch_RA,latestDay_RA)

                  //Split Batch Number

                  var BatchArray = latestBatch_RA.split(",")
                  
                  // console.log(BatchArray[0],BatchArray[1])
    
                  //DB Insertion
                  if(BatchArray[0].includes('(!)')){
                    //Filter non-dispatching date

                    //Remove specifier in the batch number
                    let newBatch = BatchArray[0].replace('(!)','')

                    const{data: insertion, error: insertion_error} = await supabase
                    .from('AZ-RD_ASMT')
                    .insert(
                      [
                        {
                          Date: latestDay_RA, Batch_Number_1: newBatch,
                          Batch_Number_2: BatchArray[1], Dispatching_Status: false
      
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
                          Date: latestDay_RA, Batch_Number_1: BatchArray[0], Batch_Number_2: BatchArray[1]
      
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

    /* */
    useEffect(()=>{

      
      const pullOutSingleOrderList = async () =>{

        if(renderCount.current > 1 && allowEffect){

          try {
  
            console.log(`ready to fetch ${selectedDisplayDate}`)
            
            //Find sheet from the storage
  
            //Get storage list from supabase storage
            const{data, error} = await supabase.storage
            .from('admin-data-bucket')
            .list(
              'Main'
            )
  
            if(error){
              throw error
            }
            else{
  
              var found = false 
              var fileName = ''
  
              //data = [{},{},{}]
              for (let i = 0; i < data.length; i++) {
                console.log(data[i].name);
  
                console.log(selectedDisplayDate);
  
                if(data[i].name.includes(selectedDisplayDate)){
                  console.log('true');
                  found  = true
                  fileName = data[i].name
                  break
                  
                }
                
                
              }
  
              if(found){
                //Download file and create the table accourdingly
                //console.log('ready to read the file')


               

                if(error){
                  throw error
                }
                else if(data){

                  // console.log(data)
                 


                  

                 

                  

                }
              }
              else{
                alert('NO ORDER-LIST found on for your choosen day')
              }
            }
            
          } catch (error) {

            console.log(error)
    
            alert(error.message)
            
          }

        }
        
      }
  
      pullOutSingleOrderList()
    },[selectedDisplayDate])

    /* */
    //Order List Uploading
    useEffect(()=>{
      const Input_date_batch_MatchCheck = async () =>{
  
        try {

          //Get Batch Number from candidate sheet
          //Get day from the database accordingly
          //Compare the recored day with the input day
  
          

          //Multiple Columns Check
          //If THIS batch number is existed in either column1 or column2
          const columnsToSearch = ['Batch_Number_1', 'Batch_Number_2'];
          const searchConditions = columnsToSearch
            .map(column => `${column}.ilike.%${file_OL_batchNum}%`)
            .join(',');
          const{data,error} = await supabase
          .from('AZ-RD_ASMT')
          .select('*')
          .or(searchConditions);
          
  
          if(error){
            throw error
          } 
          else if(data){
            

            if(data.length > 0){

              

              var spbs_day = new Date(data[0].Date.concat('T00:00:00')) //Why Concat? -> Avoid the time variation since the user's environment
              
              // console.log(data[0].Date)
              // console.log(spbs_day)
              // console.log(selectedDate_OL)

              if(spbs_day.getTime() === selectedDate_OL.getTime()){
                //Allow to update order list in the db if passing the day check
                setCheckPass(true)
              }
              else{
                alert("Check the content in your 'Order Lists', ensure that this is a ONE-DAY-Order-Lists ! ")
              }
              

            }
            else{
              alert("No day found in the table")
              return
            }

            
          }
          
        } catch (error) {
  
          alert(error.message)
          
        }
  
      }

      // console.log(renderCount.current)
      // console.log(allowEffect)

      if(renderCount.current > 1 && allowEffect){

        //Check if two groups of data are match up with each other
        Input_date_batch_MatchCheck()
      }
     
      
    },[file_OL_batchNum])

    /* */
    //For order list uploading internal check
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
                else{

                  alert('Removed');

                }
        
              
                

                
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
              }else{

                console.log('File uploaded:', data);
                alert('File uploaded successfully!');

                setCheckPass(false) //Reset the check pass

              }
  
              
  
            }
    
    
            
            
    
            
    
            
    
  
        } 
        catch (error) {
    
            console.error('Error during uploading:', error.message);
            alert(`Error during uploading: ${error.message}`);
            throw error
    
        
        }
    
      };

      const convertToTable = async () =>{
        try {

          console.log(file_OL)
          const arrayBuffer = await file_OL.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const ol_sheet = workbook.Sheets[worksheetName]
          
          var d =selectedDate_OL.getDate() >= 10 ? selectedDate_OL.getDate() : "0" +  selectedDate_OL.getDate()
          var m =selectedDate_OL.getMonth() + 1 
          m = m >= 10 ? m : "0" + m
          var y =selectedDate_OL.getFullYear()
          var tableName = `${m}-${d}-${y}-order-list`
          setCheck_OL_table(tableName)
          


      

          
        } catch (error) {

          console.log(error);
          alert(error.message)
          
        }
      }
  

      if(checkPass){

        removeFromBucket()
        uploadFileToBucket()
        convertToTable()
      }

    },[checkPass])


    useEffect(()=>{

      if(renderCount.current > 1 && allowEffect){
        try {

          const checkTb = async () =>{

            

            //Check if the table is existed


            const {data, error} = await supabase
              .from(check_OL_table)
              .select('*')
              .limit(1)
              
            //console.log(data);
            if(error && error.message.includes(`relation "public.${check_OL_table}" does not exist`)){
              console.log("table not existed")
              setCheckPass_OL_table(true)
            }else{

              //console.log('Table exists or other error', error);

              if(error){
                alert(error)
              }else if(data){

                console.log("table is existed")

                setCheckPass_OL_table(false)

              }
              

            }
            
          }


          checkTb()



          
        } catch (error) {

          console.log(error);
          alert(error.message)
          
        }
      }

    },[check_OL_table])

    
    useEffect(()=>{


      const createTb = async ()=>{

        try {


          //Create a supabase table
          const { tbData, tbError } = await supabase
          .rpc('create_dynamic_table', { table_name: check_OL_table }); 

          if(tbError){
            throw tbError
          }else{
            //Insertion
          }
          
        } catch (error) {

          alert(error)
          
        }

      }

      const insertFromStoT = async ()=> {
        try {

          const skipColumns = ['tno'];

          var ol = await file_OL.arrayBuffer();
          const workbook = XLSX.read(ol, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const d = XLSX.utils.sheet_to_json(worksheet)

          // Remove the first row (headers) and filter out columns to skip
          console.log(d);
          // const headers = d.filter(header => !skipColumns.includes(header))


          //console.log(d[0])


          //Get rid of the last two attribute for every rows
          for (let i = 0; i < Object.values(d).length; i++) {

            //Reference
            //bag_no
            //internal_account_number
            //consignee
            //address
            //city



            var prop1 = '190_pathtime'
            var prop2 = '199_pathtime'
            var prop3 = 'reference'
            var prop4 = 'bag_no'
            var prop5 = 'internal_account_number'
            var prop6 = 'consignee'
            var prop7 = 'address'
            var prop8 = 'city'

            delete Object.values(d)[i][prop1]
            delete Object.values(d)[i][prop2]
            delete Object.values(d)[i][prop3]
            delete Object.values(d)[i][prop4]
            delete Object.values(d)[i][prop5]
            delete Object.values(d)[i][prop6]
            delete Object.values(d)[i][prop7]
            delete Object.values(d)[i][prop8]
            
            
             
            
          }

          console.log(d);

          // const filter = d.filter((row)=>

          //   row.tno === "UUS0462646620487"


          // )
          // console.log(d[0]);

          // console.log(typeof(d))
          // console.log(Object.values(d)[0])

          const { data: insertData, error } = await supabase
          .from(check_OL_table)
          .insert(d)


          // if(error){
          //   throw error
          // }
          
          
        } catch (error) {

          
          alert(error)
          alert("Wrong insertions")
        }
      }

      const dltFromTable = async () =>{

        try {

          const { data, error } = await supabase
          .from('test')
          .delete()
          

          if(error){
            throw error
          }


          
        } catch (error) {

          alert(error.message)
          
        }

      }

      if(renderCount.current > 1 && allowEffect){
        if(checkPass_OL_table){
          console.log("create new table and insert")

          createTb()
          insertFromStoT()


        }
        else if(!checkPass_OL_table){
          console.log("table is existed, insert them straight")
          //createTb()
          dltFromTable()
          insertFromStoT()
        }
      }



    },[checkPass_OL_table])












    const handleRAFileChange = (e) => {
        
        const file_RA = e.target.files[0];
        setFile_RA(file_RA);
        
    };

    const handleOLFileChange = (e) =>{

        const file_OL = e.target.files[0]
        setFile_OL(file_OL)
        

      
    }

    const HandleSelectedDisplayDateChange = (e) =>{

      var d = e.target.value

      // console.log(d)
      //Format to MM-DD-YYYY
      // const parts = d.split('/')
      // d = `${parts[0]}-${parts[1]}-${parts[2]}`;
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


          /*Inner Check if batch number in the sheet is match up to the date picker*/
          
          //Get batch number from the sheet
          var ol = await file_OL.arrayBuffer();
          const workbook = XLSX.read(ol, { type: 'buffer' });
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


    





    // const Input_date_batch_MatchCheck = async () =>{

    //   try {

    //     console.log(file_OL_batchNum);
    //     const{data,error} = await supabase
    //     .from('AZ-RD_ASMT')
    //     .select('Date')
    //     // .eq('Batch_Number',file_OL_batchNum)

    //     if(error){
    //       throw error
    //     }

    //     if(data){
    //       console.log(data)
    //     }
        
    //   } catch (error) {

    //     alert(error.message)
        
    //   }

    // }
  



        

  

    

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
          <option>{currentDay}</option>
          {previousWeek.map((date,index)=>(
            <option key={index}>{date}</option>
          ))}
          
        </select>
        
        </div>

       {test}



        {/* <button onClick={mappingDateBatch}> Map Date/Batch</button> */}

        </>
    )

}

export default SPBS_Content