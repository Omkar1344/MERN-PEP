import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { serverEndpoint } from '../../config';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Bar, Pie} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import{
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const formatDate = (isoDateString) =>{
    if(!isoDateString) return '';
    try{
        const date = new Date(isoDateString);
        //July 10, 2025
        return new Intl.DateTimeFormat('en-US',{
            year:'numeric',
            month:'long',
            day:'numeric'
        }).format(date);

    }catch(error){
        console.log(error);
        return '';
    }
};

function AnalyticsDashboard() {
    const {linkId} = useParams();
    const navigate = useNavigate();
    
    const [analyticsData, setAnalyticsData] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const fetchLinkAnalytics = async ()=>{
        try{
            const response = await axios.get(`${serverEndpoint}/links/analytics`,{
                params:{
                    linkId: linkId,
                    from: fromDate,
                    to: toDate
                },
                withCredentials: true
            });
            setAnalyticsData(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
            //Navigate to error page if we're not able to fetch the link analytics.
            //This is because there is no point rendering the component if we 
            //don't have any data.
            navigate('/error')
        }
    };

    const groupBy = (key) => {
        return analyticsData.reduce((acc, item)=>{
            const label = item[key] || 'unknown';
            acc[label]=(acc[label] || 0) + 1;
            return acc;
        },{});
    };

    // [
    //     {Ashburn: 2},
    //     {unknown: 2}    
    // ]
    const clicksByCity = groupBy('city');
    const clicksByBrowser = groupBy('browser');

    const columns = [
        {field: 'ip', headerName: 'IP Address', flex: 1},
        {field: 'city', headerName: 'City', flex: 1},
        {field: 'country', headerName: 'Country', flex: 1},
        {field: 'browser', headerName: 'Browser', flex: 1},
        {field: 'device', headerName: 'Device', flex: 1},
        {field: 'isp', headerName: 'ISP', flex: 1},
        {field: 'clickedAt', headerName: 'Click Date', flex: 1, renderCell: (params)=>(
            <>{formatDate(params.row.clickedAt)}</>
        )
        },
    ];

    useEffect(()=>{
        fetchLinkAnalytics();
    },[fromDate, toDate]);
  return (
    <div className='container py-5'>
        <h1>Analytics for LinkId: {linkId}</h1>

        <div className="row mb-4 mx-0 border py-3 rounded">
            <h5>Filters:</h5>
            <div className="col-md-2">
                <DatePicker
                    selected={fromDate}
                    onChange={(date)=>setFromDate(date)}
                    className='form-control'
                    placeholderText='From (Date): '
                />
            </div>
            <div className="col-md-2">
                <DatePicker
                    selected={toDate}
                    onChange={(date)=>setToDate(date)}
                    className='form-control'
                    placeholderText='To (Date): '
                />
            </div>
        </div>
        <div className="row mb-4 mx-0 border py-3 rounded">
            <div className="col-md-8 p-3 rounded mt-2">
                <h5>Clicks by City</h5>
                <hr/>
                <Bar
                    data={{
                        labels: Object.keys(clicksByCity),
                        datasets:[
                            {
                                label: 'Clicks',
                                data: Object.values(clicksByCity),
                                backgroundColor:'rgba(54,162,235,0.6)',
                            }
                        ]
                    }}
                    options={{responsive:true}}
                />
            </div>

            <div className="col-md-4 p-3 rounded mt-2">
                <h5>Clicks by Browser</h5>
                <hr/>
                <Pie
                    data={{
                        labels: Object.keys(clicksByBrowser),
                        datasets:[
                            {
                                data: Object.values(clicksByCity),
                                backgroundColor:[
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#4BC0C0',
                                    '#9966FF',
                                    '#FF9F40',
                                ],
                            }
                        ]
                    }}
                    options={{responsive:true}}
                />
            </div>
        </div>

        <DataGrid
            getRowId={(row) => row._id}
            rows={analyticsData}
            columns={columns}
            initialState={{
                pagination:{
                    paginationModel: {pageSize:20, page:0}
                }
            }}
            pageSizeOptions={[20,50,100]}
            disableRowSelectionOnClick
            showToolbar
            sx={{
                fontFamily:'inherit'
            }}
        />
    </div>
  )
}

export default AnalyticsDashboard