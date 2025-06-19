import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function AppLayout({children}) {
  return (
    <>
    <Header/>
     <div className="container my-4">
        {children}
      </div>
    <Footer/>
    </>
  )
}

export default AppLayout