import React, { useState,useEffect, useContext } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import  { useStateValue } from '../contex/AppContext';
import { Link,useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import quizService from "../services/quizService";



const Question = () => {
  const navigate = useNavigate();
  
  
  
  const {state,dispatch} = useStateValue();

  const {user,quizzes,questionId} = state;

  const [allQuestions,setAllQuestions] = useState(quizzes?.questions);

  console.log('question',state)

  const getQuestionDetail = async (index) => {
    try {
    
      console.log('detail  la', index); 
      dispatch({ type: "GET_DETAILS_ONE_QUESTION", payload: index });
      console.log('details one question', questionId);
      navigate("/editQuestion");
    } catch (error) {
      toast.error(error);
    } 
  };

  const deleteQuestion = async (index) => {
    try {
      const formData = {
        quizId: quizzes._id,
        questionId: quizzes.questions[index]._id
    };
    console.log("delete formData", formData);
      // const questionId = allQuestions[index]._id;
      const response = await quizService.deleteOneQuestion(null, formData);
      console.log("sau khi delte",response)
      setAllQuestions(response.data.data.quiz.questions);
      dispatch({ type: 'GET_DETAILS_ONE_QUIZ', payload: response.data.data.quiz });
      toast.success('Question deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Internal server error');
    }
  };

  // const deleteQuestion = async (index) => {
  //   try {
  //     const deleteform = {
        
  //       quizId: quizzes._id,
  //         index: index 
        
  //     };
  //     console.log('xoa',deleteform);
  //     const res = await quizService.deleteOneQuestion(deleteform);
  //     console.log('da xoa',res);
      
  //     const response = await quizService.getQuizDetails(quizzes._id); // Cập nhật state quizzes với danh sách câu hỏi mới
  //     console.log('render question', response.data.quiz.questions);
  //     setAllQuestions(response.data.quiz.questions);

  //   } catch (error) {
  //     toast.error(error);
  //   } 
  // };
  
 

  return (
  <>
  
   
  {allQuestions?.map((question,index)=>{
    return (
      <div key={index} className =" flex w-full  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md px-4 py-2 mb-2 " >
  

        <div className="flex items-center justify-between mb-1 w-full">
          <div className="flex items-center">
            <IoIosCheckboxOutline  className="text-green-500 font-bold"/>
            <span className="font-bold">1. Nhiều lựa chọn</span>
          </div>
       <div className="flex items-center ">
          <button className=" hover:text-blue-500  py-1 px-2 rounded ml-auto inline-flex items-center">
            
              <FaPencilAlt  onClick={()=>getQuestionDetail(index)}className="mr-1" />
           
          </button>
          <button className=" hover:text-red-500  py-1 px-2 rounded ml-auto inline-flex items-center">
            <Link to="">
            <DeleteOutlined onClick={()=>deleteQuestion(index)} className="mx-1" /> 
             </Link>
          </button>
          </div>
          
        </div>
        <div className="text-2xl mb-1 w-full relative">
          <span className="px-2">{index+1}.</span>
          <span>{question?.questionName}</span>
        </div>
        <hr className="w-full border-1 border-b-3 bg-gray-200 "  />
        <br></br>
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full mb-3">
        {/* Đáp án 1 */}
          <div className="md:w-1/2 w-full flex">
          
          <span className={`rounded-full w-6 h-6 flex items-center justify-center
               ${question?.correctAnswer === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                <span className="text-ls">1</span>
              </span>
              <span className="ml-2">{question?.answers[0]}</span>
          
          </div>

          {/* Đáp án 2 */}
          <div className="md:w-1/2 w-full flex">
          <span className={`rounded-full w-6 h-6 flex items-center justify-center
               ${question?.correctAnswer === 2 ? 'bg-green-500' : 'bg-red-500'}`}>
                <span className="text-ls">2</span>
              </span>
              <span className="ml-2">{question?.answers[1]}</span>
          
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 w-full mb-3">
        {/* Đáp án 3 */}
        <div className="md:w-1/2 w-full flex">
        <span className={`rounded-full w-6 h-6 flex items-center justify-center
               ${question?.correctAnswer === 3 ? 'bg-green-500' : 'bg-red-500'}`}>
                <span className="text-ls">3</span>
              </span>
              <span className="ml-2">{question?.answers[2]}</span>
          
          </div>

          {/* Đáp án 4 */}
          <div className="md:w-1/2 w-full flex">
          <span className={`rounded-full w-6 h-6 flex items-center justify-center
               ${question?.correctAnswer === 4 ? 'bg-green-500' : 'bg-red-500'}`}>
                <span className="text-ls">4</span>
              </span>
              <span className="ml-2">{question?.answers[3]}</span>
          
          </div>
        </div>
    </div>
    )
  })}
  </>)
};

export default Question;
