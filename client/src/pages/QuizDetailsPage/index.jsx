import React, { useReducer } from 'react';
import MyHeader from '../../components/MyHeader';
import MySidebar from '../../components/MySidebar';
import QuizDetail from '../../components/QuizDetail';
import './QuestionDetail.css';


const QuizDetailsPage = () => {

  

  
  return (
  
    <div className='w-full h-full flex'>
     <MySidebar/>
     <div className='w-full h-full'>
    <MyHeader/>
    <div className='w-full h-[calc(100vh-50px)]'>
       <QuizDetail />
     </div>
     </div>
    </div>
  )
}

export default QuizDetailsPage
