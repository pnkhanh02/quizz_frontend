import React, { useContext, useEffect, useState } from 'react';
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import {CommentOutlined, LikeOutlined, QuestionCircleOutlined, UserOutlined} from "@ant-design/icons"
import { FaPencilAlt } from 'react-icons/fa';
import  { useStateValue } from '../contex/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';
import { toast } from 'react-toastify';



const Title = ({ toggleQuestion, toggleComment }) => {

  const {state,dispatch} = useStateValue();
  const {quizzes,comment} = state;
  const navigate = useNavigate();
    console.log('title comment la', quizzes?.questions, comment);

    const getQuizDetail = async (quizId) => {
      try {
      
        const response = await quizService.getQuizDetails(quizId);
        console.log('detail la', response.data.quiz); 
        dispatch({ type: "GET_DETAILS_ONE_QUIZ", payload: response.data.quiz });
        dispatch({ type: "UPDATE_COMMENT", payload: response.data.quiz.comments.length });
        console.log('details one quiz', state);
        navigate(`/editQuiz/${quizId}`);
      } catch (error) {
        toast.error(error);
      } 
    };
   


  return (
    <div className ="relative flex  w-full flex-col rounded-xl bg-yellow-200 bg-clip-border text-gray-700 shadow-md">
  <div className='flex-col flex '>
        <div className='flex items-center  flex-col'>
          <div className='flex items-end'>
        <img src={quizzes?.imgUrl} alt="quizImage" className="w-[50px] h-[50px]  rounded-xl mt-2 justify-center" />
        <button onClick={()=>getQuizDetail(quizzes?._id)} className=" hover:text-blue-500  py-1 px-2 rounded ml-auto inline-flex items-center">
          
              <FaPencilAlt className="ml-2" />
          
          </button>
        
        </div>
        <p className="font-bold mt-2 justify-center ">{quizzes?.title}</p>
        </div>
        <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
        <div className="flex items-center ml-5">
          <MdOutlineQuestionAnswer />
          <p className='pl-1 '> {quizzes?.questions.length} Quesitons </p>
          </div>
          <div className='flex items-center ml-5 '>
          <IoLibraryOutline />
          <p className='pl-1'>{quizzes?.category}</p>
        </div>
        <div className='flex items-center ml-5' > 
          <UserOutlined />
          <p className='pl-2'>{quizzes?.createdBy.name}</p> 
        </div>
        </div>
        <div className="p-4 pt-3 flex justify-center">
    <button
      className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-light="true"
    >
      PLAY
    </button>
  </div>
  </div>
  <div className="flex items-center ml-5">
          <LikeOutlined />
          <p className='pl-2 pr-5'>{quizzes?.likes}</p>
          <button className=" hover:text-green-600  py-1 px-2 rounded ml-auto inline-flex items-center" onClick={toggleComment}>
            
            <CommentOutlined />
            <p className='pl-2 pr-5'>{ comment}</p> 
            
          </button>
          
          
          <button className=" hover:text-green-600  py-1 px-2 rounded ml-auto inline-flex items-center" onClick={toggleQuestion}>
            
            <QuestionCircleOutlined className='mx-1'/> 
            
          </button>
          
          </div>

      </div>
    
  
</div>
  )
}

export default Title;




