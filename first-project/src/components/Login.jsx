import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {


  // const handleSubmit=(event)=>{
  //   event.preventDefault();

  //   if(validate()){
  //     if(FormData.username==='admin')
  //   }
  // }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>

      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '22rem' }}>
        <h3 className="text-center mb-4">Login Page</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
