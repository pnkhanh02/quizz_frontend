import React from 'react'
import EditQuestion from '../../components/EditQuestion'
import MySidebar from '../../components/MySidebar'
import MyHeader from '../../components/MyHeader'

const EditQuestionPage = () => {
  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] bg-gray-200 flex items-center justify-center '>
   <EditQuestion/>
    </div>
    </div>
   </div>
  )
}

export default EditQuestionPage
