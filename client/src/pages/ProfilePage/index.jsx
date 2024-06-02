import React, { useState } from 'react'
import MyHeader from '../../components/MyHeader'
import MySidebar from '../../components/MySidebar'
import Profile from '../../components/Profile'
import './Profile.css';


const ProfilePage = () => {
 
  
  return (
    <div className='w-full h-[100vh] flex '>
     <MySidebar  />
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>
   <Profile  />

    </div>
    </div>
   </div>
  )
}

export default ProfilePage
