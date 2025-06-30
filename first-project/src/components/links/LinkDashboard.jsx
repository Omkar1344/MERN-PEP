import React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { serverEndpoint } from '../../config';
import { useEffect } from 'react';
import axios from 'axios';


function LinkDashboard() {
    const [errors, setErrors]=useState({});
    const [linksData, setLinksData] = useState([]);

    const fetchLinks=async()=>{
        try{
            const response = await axios.get(`${serverEndpoint}/links`,{
                withCredentials: true
            });
            setLinksData(response.data.data);
        }catch(error){
            console.log(error);
            setErrors({message: 'Unable to fetch links at the moment, please try again'})
        }
    };

    useEffect(()=>{
        fetchLinks();
    },[]);

    const columns=[
        {field:'campaignTitle',headerName:'Campaign', flex:2},
        {field:'originalUrl', headerName:'URL', flex:3},
        {field:'category', headerName:'Category', flex:2},
        {field:'clickCount', headerName:'Clicks', flex:1},
        {field:'action', headerName:'Action', flex:1, renderCell:(params)=>(
            <>
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </>
        )},
    ];
  return (
    <div className='container py-4'>
        <h2>Manage your Affiliate Links</h2>
        {errors.message&&(
            <div className='alert alert-danger' role='alert'>
                {errors.message}
            </div>
        )}

        <div style={{height:500, width:'100%'}}>
            <DataGrid 
                getRowId={(row)=>row._id}
                rows={linksData}
                columns={columns}
                initialState={{
                    pagination:{
                        paginationModel:{pageSize: 20 ,page:0}
                    }
                }}
                rowsPerPageOptions={[20,50,100]}
                disableRowSelectionOnClick
            />
        </div>
    </div>
  )
}

export default LinkDashboard