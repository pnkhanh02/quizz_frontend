import React from 'react'
import MyLibrary from '../../components/MyLibrary'
import MyHeader from '../../components/MyHeader'
import MySidebar from '../../components/MySidebar'

const MyLibraryPage = () => {
  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>
   <MyLibrary/>
    </div>
    </div>
   </div>
  )
}

export default MyLibraryPage
