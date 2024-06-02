import React from 'react'
import MySidebar from '../../components/MySidebar'
import MyHeader from '../../components/MyHeader'
import QuizSetting from '../../components/QuizSetting'
import Question from '../../components/Question'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../contex/AppContext'
import { toast } from 'react-toastify'

const NewQuizPage = () => {

  const {state,dispatch} = useStateValue();

  const {user,quizzes,questionId} = state;
  const navigate = useNavigate();

  const createOneQuestion = async () => {
    try {
     
      dispatch({ type: "NEW_QUESTION", payload :-1 });
      console.log('details new question', state);
      navigate("/editQuestion");
    } catch (error) {
      toast.error(error);
    } 
  };


  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>


   <div className="bg-gray-200  h-screen flex  ">
            <nav className="bg-gray-200 w-1/4 h-screen flex flex-col gap-1 border-r border-slate-100 ">
            <div className= "flex items-center w-full justify-center flex-col gap-1 border-b border-emerald-slate-50 py-1 px-1 bg-gray-200">
            <QuizSetting/>
            </div>
        

            </nav>
            <div className="p-1 bg-fuchsia-200 w-3/4 py-1 px-2  flex-col overflow-y-auto overflow-x-hidden h-6/6" >
            <div className='flex items-center justify-between m-2'>
                  <span>{quizzes?.questions?.length} Questions</span>
                  
                  <Button onClick={()=>createOneQuestion()} className=' flex items-center'><PlusCircleOutlined />Add Question</Button>
                  
                </div>
                <Question />
            </div>
        </div>

       

    </div>
    </div>
   </div>
  )
}

export default NewQuizPage
