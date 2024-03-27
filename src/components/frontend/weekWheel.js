import React, { Component, useEffect, useState} from 'react';

//Frontend

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


const WeekWheel = ()=>{

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
    
    <>

    
     <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              alignItems: "center",
              justifyContent: "center"}}>

            <ArrowLeftIcon/>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
            <Item>Item 5</Item>
            <ArrowRightIcon/>
     </Stack>
    </>
    
    
    )

}


export default WeekWheel