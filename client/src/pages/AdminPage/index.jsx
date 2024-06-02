import React from 'react';
import MyHeader from '../../components/MyHeader';
import MySidebar from '../../components/MySidebar';
import Report from '../../components/Report';



const AdminPage = () => {
  return (
    
    <div className='w-full h-[100vh] flex '>
     <MySidebar/>
     <div className='w-full h-full'>
    <MyHeader/>
    <div className='w-full h-[calc(100vh-50px)] '>
    <Report/>
     </div>
     </div>
    </div>
  )
}

export default AdminPage

