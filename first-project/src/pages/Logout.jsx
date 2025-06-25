import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout =async () =>{
        try{
        await axios.post('http://localhost:5000/auth/logout',{},{
            withCredentials:true
        });
       dispatch({
        type:'CLEAR_USER'
       });
    }catch(error){
        console.log(error);
        navigate('/error');
    }
};
    useEffect(()=>{
        handleLogout();
    },[]);
}


export default Logout