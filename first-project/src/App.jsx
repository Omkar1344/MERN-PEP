import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Register from "./components/Register";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "./layout/UserLayout";
import { Spinner } from "react-bootstrap";
import ManageUsers from "./pages/users/ManageUser";
import ProtectedRoute from "./rbac/ProtectedRoute";
import UnauthorizedAccess from "./components/UnauthorizedAccess";

function App() {
  // const [userDetails, setUserDetails]=useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // const updateUserDetails = (updatedData) => {
  //   // setUserDetails(updatedData);
  //   dispatch({
  //     type: "SET_USER",
  //     payload: updatedData,
  //   });
  // };

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/is-user-logged-in",
        {},
        {
          withCredentials: true,
        }
      );
      // updateUserDetails(response.data.userDetails);
      dispatch({
        type:'SET_USER',
        payload:response.data.userDetails
      });
    } catch (error) {
      console.error("User not loggedin", error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if(loading){
    return <Spinner/>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? 
          <UserLayout>
            <Navigate to='/dashboard'/>
          </UserLayout>: (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login/>
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          userDetails ? 
          <UserLayout>
            <Dashboard/>
          </UserLayout> : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/users" element={userDetails ? 
      <ProtectedRoute roles={['admin']}>
        <UserLayout>
          <ManageUsers/>
        </UserLayout>
        </ProtectedRoute>:
        <Navigate to='/login'/>
      }/>

      <Route path='/unauthorized-access' element={userDetails?
        <UserLayout>
          <UnauthorizedAccess/>
        </UserLayout>:
        <Navigate to='/login'/>
      }/>
      <Route
        path="/logout"
        element={
          userDetails ? (
            <Logout />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/error"
        element={
          userDetails ? 
          <UserLayout>
            <Error/>
          </UserLayout>: (
            <AppLayout>
              <Error />
            </AppLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          <AppLayout>
            <Register />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default App;
