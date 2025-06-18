import React from 'react'
import { useState } from 'react'


function Login() {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const handlesubmit=(e)=>{
        e.preventDefault();
        alert(`Username: ${username}\n Password: ${password}`)
    }

  return (
    <div>
        <h1>Sign in to continue</h1>
        <div>
            UserName: <input type='text'></input>
            Password: <input type='password'></input>
            <button type='submit'>Submit</button>
        </div>
    </div>
  )
}

export default Login