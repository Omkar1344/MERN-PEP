import React from 'react'

function UnauthorizedAccess() {
  return (
    <div className='container text-center'>
        <h2>Unauthorized Access</h2>
        <p>
            You do not have sufficient permissions to view this page.
            Please contact your admin.
        </p>
    </div>
  )
}

export default UnauthorizedAccess;