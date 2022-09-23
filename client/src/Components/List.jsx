import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { serverUrl } from '../serverUrl';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function List() {

    const [open, setOpen] = React.useState(false);
    const [item,setItem] =useState({})
    const [change, setChanged] = useState(true);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const editItem =()=>{
 axios.patch(`${serverUrl}/edit`,item)
 .then((res)=>{
    console.log(res);
    setChanged(!change)
    setOpen(false)


 })
 .catch((err)=>{
    console.log(err);
 })
}

// const handleDelete =()=>{
//     axios.delete(`${serverUrl}?id=${item.id}`)
//     .then((res)=>{
//         setChanged(!change)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }
  
  const columns = [
    { field: 'listItem', headerName: 'item', width: 230 },

    {
      field: 'action',
      width: 330,
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const handleEdit = async (e) => {
            setItem({id:params.row._id,listItem:params.row.listItem})
            setOpen(true);
          e.stopPropagation(); // don't select this row after clicking
          
        };

        return (
          <div>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='success'
              onClick={handleEdit}
            >
              Edit
            </Button>
            {/* <CloseIcon onClick={handleDelete}/> */}
          </div>
        );
      },
    },
    {
        field: 'Delete',
        width: 330,
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => {
          const handleDelete = async (e) => {

            axios.delete(`${serverUrl}/${params.row._id}`)
            .then((res)=>{
                setChanged(!change)
            })
            .catch((err)=>{
                console.log(err);
            })
            
          };
  
          return (
            <div>
              
              <CloseIcon onClick={handleDelete}/>
            </div>
          );
        },
      },
  ];

  const [list, setList] = React.useState();
  function fetchData() {
    axios
      .get(`${serverUrl}/list`)
      .then((res) => {
        let response = res.data;
        setList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchData();
  }, [change]);

  console.log(list);
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {list && (
        <DataGrid
          rows={list}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
      //////
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          
          <TextField
          value={item.listItem}
            autoFocus
            margin="dense"
            id="name"
            label="List Item"
            type="email"
            fullWidth 
            variant="standard"
            onChange={(e)=>{setItem({...item,listItem:e.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editItem}>Update</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
