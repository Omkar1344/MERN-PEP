import React from 'react'
import UserHeader from './UserHeader'
import UserFooter from './UserFooter'

function UserLayout({children}) {
  return (
    <>
        <UserHeader/>
        {children}
        <UserFooter/>
    </>
  )
}

export default UserLayout