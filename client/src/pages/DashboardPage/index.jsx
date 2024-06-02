import React from 'react'
import MyHeader from '../../components/MyHeader'
import MySidebar from '../../components/MySidebar'
import Dashboard from '../../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-full '>
   <Dashboard/>
    </div>
    </div>
   </div>
  )
}

export default DashboardPage
