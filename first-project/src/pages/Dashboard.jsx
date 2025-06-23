import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
   
  return (
    <div className='container text-center'>
        <h1>User Dashboard</h1>
        <Link to='/logout'>Logout</Link>
    </div>
  )
}

export default Dashboard