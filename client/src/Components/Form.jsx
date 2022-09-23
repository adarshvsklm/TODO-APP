import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios'
import { serverUrl } from '../serverUrl';

function Form() {
    const [list ,setList] =useState()
    const handleSubmit =()=>{
        console.log(list);
        axios.post(`${serverUrl}/add`,{listItem:list})
        .then((res)=>{
            console.log(res);
        })  
        .catch((err)=>{ 
            console.log(err);
        })
    }

  return (
    <div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
      noValidate
      autoComplete="off"
    >
        <h2>Add To List</h2>
      <TextField id="outlined-basic" label="Enter " variant="outlined" onChange={(e)=>{setList( e.target.value)}} />
      <Button variant='contained' onClick={handleSubmit}>Add</Button>
    </Box>
    </div>
  )
}

export default Form
 