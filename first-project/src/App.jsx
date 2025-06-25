import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Home from './components/Home';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Register from './components/Register';

function App() {

  const [userDetails, setUserDetails]=useState(null);

  const updateUserDetails=(updatedData)=>{
    setUserDetails(updatedData);
  };

  const isUserLoggedIn=async()=>{
    try{
    const response=await axios.post('http://localhost:5000/auth/is-user-logged-in',{},{
      withCredentials:true
    });
    updateUserDetails(response.data.userDetails);
  }catch(error){
    console.error('User not loggedin',error);
  }
};
  useEffect(()=>{
    isUserLoggedIn();
  },[]);

  return (
      <Routes>
        <Route path="/" element={userDetails?
          <Navigate to='/dashboard'/>:
          <AppLayout>
            <Home/>
          </AppLayout>
        }/>
        <Route path="/login" element={userDetails?
          <Navigate to="/dashboard"/>:
          <AppLayout>
            <Login updateUserDetails={updateUserDetails}/>
          </AppLayout>
        }/>
        <Route path="/dashboard" element={userDetails?
        <Dashboard updateUserDetails={userDetails}/>:
        <Navigate to='/login'/>
        }/>
        <Route path='/logout' element={userDetails?
          <Logout updateUserDetails={updateUserDetails}
          />:
          <Navigate to="/login"/>
        }/>
        <Route path='/error' element={userDetails?
          <Error/>:
          <AppLayout><Error/></AppLayout>
        }/>
        <Route path="/register" element={<AppLayout><Register/></AppLayout>} />
      </Routes>
  )
}

export default App
