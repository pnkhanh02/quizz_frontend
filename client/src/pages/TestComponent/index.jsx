import React from 'react'
import MyHeader from '../../components/MyHeader'
import MySidebar from '../../components/MySidebar'
import Comment from '../../components/Comment'
import Upload from '../../components/Upload'


const TestComponentPage = () => {
  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>
   <Comment/>
    </div>
    </div>
   </div>
  )
}

export default TestComponentPage
