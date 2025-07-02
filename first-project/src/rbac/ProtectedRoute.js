import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({roles, children}) {
    const userDetails = useSelector((state)=>state.userDetails);
    return roles.includes(userDetails?.role)?children:
    <Navigate to="/unauthorized-access"/>
}

export default ProtectedRoute;