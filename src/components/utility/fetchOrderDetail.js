import React, { useEffect, useState, useRef } from 'react'

import { format, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import * as XLSX from 'xlsx';

import { supabase } from '../../supabaseClient'
//import { endOfTomorrow } from 'date-fns';

//Frontend
import PieChart from '../frontend/pieChart'


export const FetchOrderDetail = () =>{

    //var [DATE,setDATE] = useState(new Date());

    // Render Initialization Control
    // This state is used to control when to allow useEffect logic after two renders
    const [allowEffect, setAllowEffect] = useState(false);
    const renderCount = useRef(0);

  

    //const [file_RA, setFile_RA] = useState(null); //File type
    //const [file_OL, setFile_OL] = useState(null)  //File type
    //const [file_OL_batchNum, setFile_OL_batchNum] = useState(null)

    //const [selectedDate_OL,setSelectedDate_OL] = useState(null) //For Uploading Order List
    //const [checkPass,setCheckPass] = useState(false) //check pass for input day and recorded day
    //const [check_OL_table, setCheck_OL_table] = useState(null)//String: "mm-dd-yyyy-order-lists", File name for chekcing if uploading order list has corresponding "supbase table" setup    
    //const [checkPass_OL_table, setCheckPass_OL_table] = useState(null)//Bool: check pass for if uploading order list has corresponding "supbase table" setup 
    
    const [checkPass_dsbd_s_d, setCheckPass_dsbd_s_d] = useState(false)
    const [dsbd_single_day, setDsbd_single_day] = useState([]) //The file of "Order List" in terms of an object list


    const [selectedDisplayDate, setSelectedDisplayDate] = useState(null)//For displaying Order List
    const [currentDay, setCurrentDay] = useState('');
    const [previousWeek, setPreviousWeek] = useState([]);

    const this_DSP = useRef('')
    const DSP_List = useRef([]) //in one order list
    const [displayDSP, setDisplayDSP] = useState(false)
   
    //Visualization
    const [S_Day_S_Driver_Obj, setS_Day_S_Driver_Obj] = useState(null)
    const [S_Day_S_DSP_Obj, setS_Day_S_DSP_Obj] = useState(null)


    const data = { Apple: 10, Banana: 20, Cherry: 30, Date: 40 };

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
      //console.log(days);
      //console.log(format(today, 'MM-dd-yyyy'));
    },[])


    // Apply this useEffect to update the ref after the first render
    useEffect(() => {
      renderCount.current += 1;

      // If the component has rendered more than twice, allow the useEffect logic
      if (renderCount.current > 1 && !allowEffect) {
        setAllowEffect(true);
      }
      
      
    }, []);



    /* Daily Order List Selection */
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

                setCheckPass_dsbd_s_d(true)
              }
              else{

                //Clear front end display
                document.getElementById('tableContainer').innerHTML = ''


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

    /* Daily Order List Fetch */
    useEffect(()=>{

      const fetch = async () =>{
        try {

          var t_name = selectedDisplayDate + "-order-list"


          const{data, error} = await supabase
          .from(t_name)
          .select('*')
          .limit(8000)

          console.log(data)

          setDsbd_single_day(data)
          
        } catch (error) {

          alert(error)
          console.log(error.message)
          
        }

      }

      if(renderCount.current > 1 && allowEffect){

        if(checkPass_dsbd_s_d){

          fetch()

          setCheckPass_dsbd_s_d(false) //controller
          
          
        }

      }

    },[checkPass_dsbd_s_d])

    /* Daily Order Clustering */
    useEffect(()=>{

      if(renderCount.current > 1 && allowEffect){

        console.log(dsbd_single_day)

        //Categorized

        const driver_v = dsbd_single_day.reduce((accumulator, order) => {
          //Use the driver ID as the key for object in the accumulator
          const key = order.service_number;
        
          // If the key doesn't exist yet, create it and assign an array
          if (!accumulator[key]) {
            accumulator[key] = [];
          }
        
          // Add the current item to the appropriate category
          accumulator[key].push(order);
        
          return accumulator;
          
        }, {});

        setS_Day_S_Driver_Obj(driver_v)
        
        console.log(driver_v);
        console.log(driver_v['12957'])


        //Sorting by DSP
          const dsp_v = dsbd_single_day.reduce((accumulator,order)=>{

            var thisDriver = order.service_number

            var thisDSP = order.dsp_name

            // if (26416 <= thisDriver && thisDriver <= 26465){

            //   thisDSP = 'DEL'

            // }else if (20553 <= thisDriver && thisDriver <= 20602){

            //   thisDSP = 'Arcadia'
              
            // }else if (16549 <= thisDriver && thisDriver <= 16588){
            //   thisDSP = 'Desert'
            // }
            // else if (21088 <= thisDriver && thisDriver <= 21137){
            //   thisDSP = 'Top Car Yarde'
            // }
            // else if (22300 <= thisDriver && thisDriver <= 22349){
            //   thisDSP = 'Get Ya Roll'
            // }
            // else if (12948 <= thisDriver && thisDriver <= 12997){
            //   thisDSP = 'L Dan'
            // }
            // else if (15287 <= thisDriver && thisDriver <= 15336){
            //   thisDSP = 'Haulblaze'
            // }
            // else{

            //   //Functions Handles
            //   thisDSP = 'PHX Warehouse'

            // }



            //Use the driver ID as the key for object in the accumulator
            

            // If the key doesn't exist yet, create it and assign an array
            if (!accumulator[thisDSP]) {
              accumulator[thisDSP] = [];
            }

            // Add the current item to the appropriate category
            accumulator[thisDSP].push(order);
          
            return accumulator;


        },{})

        setS_Day_S_DSP_Obj(dsp_v)
        console.log(dsp_v);

      }

    }, [dsbd_single_day])

    

    /* Daily Order List Display - Frontend data mapping */
    useEffect(()=>{
    //   console.log(renderCount.current)
    //   console.log(allowEffect)

      const genDSPlist = () =>{
        for (let i = 0; i < Object.values(dsbd_single_day).length; i++){
            var thisDriver = parseInt(Object.values(dsbd_single_day)[i]['service_number']) // plus "convertion"
            // var thisDsp = ''
            
            if (26416 <= thisDriver && thisDriver <= 26465){

              this_DSP.current = 'DEL'

            }else if (20553 <= thisDriver && thisDriver <= 20602){

              this_DSP.current = 'Arcadia'
              
            }else if (16549 <= thisDriver && thisDriver <= 16588){
              this_DSP.current = 'Desert'
            }
            else if (21088 <= thisDriver && thisDriver <= 21137){
              this_DSP.current = 'Top Car Yarde'
            }
            else if (22300 <= thisDriver && thisDriver <= 22349){
              this_DSP.current = 'Get Ya Roll'
            }
            else if (12948 <= thisDriver && thisDriver <= 12997){
              this_DSP.current = 'L Dan'
            }
            else if (15287 <= thisDriver && thisDriver <= 15336){
              this_DSP.current = 'Haulblaze'
            }
            else{

              //Functions Handles
              this_DSP.current = 'PHX Warehouse'

            }


            if(!DSP_List.current.includes(this_DSP.current)){
              DSP_List.current.push(this_DSP.current)
            }


            //Filter "PHX Warehouse"
            //DSP_List.current = DSP_List.current.filter((DSP) => DSP !== "PHX Warehouse")

            
        }
      }

      const displayData = ()=>{

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);

        if (dsbd_single_day.length > 0) {


          //console.log(dsbd_single_day.length);
          const headers = Object.keys(dsbd_single_day[0]).slice(0,-1); //// Excludes the last column header

          //console.log(headers)

          const headerRow = document.createElement('tr');
          headers.forEach(headerText => {
              const header = document.createElement('th');
              header.textContent = headerText;
              headerRow.appendChild(header);
          });
          thead.appendChild(headerRow);
  
          // Add data rows
          dsbd_single_day.forEach(row => {
              const tr = document.createElement('tr');
              headers.forEach(headerText => {
                  const td = document.createElement('td');
                  td.textContent = row[headerText];
                  tr.appendChild(td);
              });
              tbody.appendChild(tr);
          });
      }
  
      // Append this table to your document, for example, to a div with id="tableContainer"
      document.getElementById('tableContainer').appendChild(table);




      }

      if (renderCount.current > 1 && allowEffect) {

        genDSPlist()
        displayData()

        console.log(DSP_List)

        setDisplayDSP(displayDSP+1)
      }

    }, [dsbd_single_day])


    useEffect(()=>{

    },[displayDSP])



    const HandleSelectedDisplayDateChange = (e) =>{

      //setDsbd_single_day([])

      var d = e.target.value

      // console.log(d)
      //Format to MM-DD-YYYY
      // const parts = d.split('/')
      // d = `${parts[0]}-${parts[1]}-${parts[2]}`;
      setSelectedDisplayDate(d)

      
    }


    const [DSPSel, setDSPSel] = useState('')
    const [DSPStats_Single_Day, setDSPStats_Single_Day] = useState({})
    const [DSPStats_Single_Day_pieV, setDSPStats_Single_Day_pieV] = useState({})

    const handleDSPselected = (e) =>{


      const val = e.target.value
      setDSPSel(val)

      //console.log(S_Day_S_DSP_Obj[val]);

      //Sorting Single DSP order list based on 

      const state_sort = S_Day_S_DSP_Obj[val].reduce((accumulator,order)=>{

        const key = order.state

        if(!accumulator[key]){
          accumulator[key] = []
        }

        accumulator[key].push(order)

        return accumulator

      },{})


      var dsp_stats = {
        ttl: S_Day_S_DSP_Obj[val].length
      }

      console.log(state_sort);


      //console.log(ttl)
      for(var state in state_sort){

        dsp_stats[state] = state_sort[state].length
      
        console.log(state,state_sort[state].length)
      }


      const {ttl, ...fltrDsp_stats} =dsp_stats
      

      setDSPStats_Single_Day_pieV(fltrDsp_stats)
      setDSPStats_Single_Day(dsp_stats)
      console.log(dsp_stats);
      console.log(fltrDsp_stats);




      // switch(val){
      //   case 'Top Car Yarde':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     //console.log(S_Day_S_Driver_Obj[val])
      //     break
      //   case 'Haulblaze':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      //   case 'Arcadia':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      //   case 'DEL':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      //   case 'Desert':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      //   case 'L Dan':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      //   case 'Get Ya Roll':
      //     console.log(S_Day_S_DSP_Obj[val]);
      //     break
      // }




      //console.log(val);



    }




    return(

        <>
        <h2>Order Detail</h2>

        <select onChange={HandleSelectedDisplayDateChange}>
          <option>{currentDay}</option>
          {previousWeek.map((date,index)=>(
            <option key={index}>{date}</option>
          ))}
          
        </select>

        {/* <ul>

  
        {DSP_List.current.map((item, index) => (

            
            <li key={index}>{item}</li> 
            
         
        ))}
        </ul> */}

        <select onChange={handleDSPselected}>
            {DSP_List.current.map((item, index) => (
            <option key={index} value={item}>{item}</option> 
            ))}
        </select>

        <PieChart data={DSPStats_Single_Day_pieV}></PieChart>

        <div id="tableContainer"></div>

        </>



       
    )

}

export default FetchOrderDetail