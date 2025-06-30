import React from 'react';
import { Link } from 'react-router-dom';
import LinkDashboard from '../components/links/LinkDashboard';

function Dashboard({ updateUserDetails }) {
  // const user = updateUserDetails; // Contains user info passed from App

  // return (
  //   <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
  //     <div className="card shadow-lg p-5 text-center" style={{ width: '100%', maxWidth: '600px' }}>
  //       <div className="mb-4">
  //         <h2 className="text-primary fw-bold">Welcome to Your Dashboard!</h2>
  //         <p className="text-muted">Manage your account, view activities, and more.</p>
  //       </div>

  //       <div className="mb-4">
  //         <img
  //           src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  //           alt="User Icon"
  //           width="100"
  //           className="mb-3"
  //         />
  //         <h4 className="fw-semibold">
  //           Hello, {user?.name || 'User'} 👋
  //         </h4>
  //         <p className="text-muted">This is your personalized dashboard.</p>
  //       </div>

  //       <div className="d-grid">
  //         <Link to="/logout" className="btn btn-danger fw-semibold">
  //           Logout
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  return(
    <>
      <LinkDashboard/>
    </>
  )
}

export default Dashboard;
