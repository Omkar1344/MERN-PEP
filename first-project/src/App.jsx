import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';

function App() {

  const {userDetails, setUserDetails}=useState(null);

  const updateUserDetails=(updatedData)=>{
    setUserDetails(updatedData);
  };

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
        <Dashboard/>:
        <Navigate to='/login'/>
        }/>
      </Routes>
  )
}

export default App
