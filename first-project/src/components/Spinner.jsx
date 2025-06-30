import React from 'react'

function Spinner() {
  return (
    <div className='container text-center'>
        <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
        </div>
    </div>
  )
}

export default Spinner