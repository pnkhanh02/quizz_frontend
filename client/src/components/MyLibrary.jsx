import React, { useContext, useEffect, useState } from 'react'
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import {CommentOutlined, DeleteOutlined, LikeOutlined, UserOutlined} from "@ant-design/icons"
import quizService from '../services/quizService';
import { toast } from 'react-toastify';
import { Pagination } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../contex/AppContext';
import AppReducer from '../reducers/AppReducer';
import { FaPencilAlt } from 'react-icons/fa';



export default function MyLibrary() {

  const {state,dispatch} = useStateValue();

  const {user,quizzes} = state;
  const [quizDetail, setQuizDetail] = useState();
  const [allQuizzes,setAllQuizzes] = useState([]);
  const [totalPages,setTotalPages] =useState(0);
  const [page,setPage] = useState(1);
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  
  

  const getAllMyQuizzes = async(pageNumber) =>{

    try {
      console.log("getAllMyQuiz function executed",user.user._id,pageNumber);
      const response = await quizService.getAllMyQuizzes(user.user._id, pageNumber);   
      console.log("response  la :",response.data.currentPage,pageNumber,response.data);
      setAllQuizzes(response.data.data.quizzes);
      setTotalPages(response.data.totalPages);
} catch (error) {
      toast.error(error)}
}
useEffect(()=>{ 
getAllMyQuizzes(page);
  },[page])

  

  const getQuizDetail = async (quizId,mode) => {
    try {
    
      const response = await quizService.getQuizDetails(quizId);
      console.log('detail la', response.data.quiz); 
      dispatch({ type: "GET_DETAILS_ONE_QUIZ", payload: response.data.quiz });
      dispatch({ type: "UPDATE_COMMENT", payload: response.data.quiz.comments.length });
      console.log('details one quiz', state);
      mode=="detail"?navigate("/quizDetails/:quizId"):navigate(`/editQuiz/${quizId}`);
    } catch (error) {
      toast.error(error);
    } 
  };

  const deleteQuiz = async (index) => {
    try {
      
      console.log('xoa',index);
      const res = await quizService.delete(index);
      const resQuiz = await getAllMyQuizzes();
      
      console.log('delete question', resQuiz);
    } catch (error) {
      toast.error(error);
    } 
  };




  const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setPage(pageNumber); // Cập nhật trang hiện tại
  }

  return (
    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
       <div className="flex justify-end mt-2">
    <div className="pl-10 bg-gray-200 w-[1000px] h-[700px] ">
        <h1 className="mx-5 my-5 text-2xl font-bold">My Library</h1>
        <div className="grid grid-rows-4 gap-1 ">

        {allQuizzes.map((quiz,index)=> {
  return (
    <div key={index} className="w-[800px] h-[115px] bg-white flex relative bg-clip-border rounded-xl p-2 shadow-md">
      <img src={quiz?.imgUrl} alt="quizImage" className="w-[95px] h-[95px]  rounded-xl" />
      <div className="ml-5 mt-1 w-full">

        <div className='flex justify-between items-center'>

        <button onClick={()=>getQuizDetail(quiz._id,"detail")} className="rounded-lg bg-gray-200 w-fit">
          <p className="font-bold">{quiz.title}</p>
          </button>

          <div className="flex items-center ">
          <button onClick={()=>getQuizDetail(quiz._id,"edit")} className=" hover:text-blue-500  py-1 px-2 rounded ml-auto inline-flex items-center">
          
              <FaPencilAlt className="mr-1" />
           
          </button>
          <button onClick={()=>deleteQuiz(quiz._id)} className=" hover:text-red-500  py-1 px-2 rounded ml-auto inline-flex items-center">
            <Link to="">
            <DeleteOutlined className="mx-1" /> 
             </Link>
          </button>
          </div>
        </div>
        <div className="flex items-center">
          <MdOutlineQuestionAnswer />
          <p className='pl-2 pr-10'>{quiz.questionCount} Questions</p>
          <IoLibraryOutline />
          <p className='pl-2'>{quiz.category}</p>
        </div>
        <div className='flex items-center' > 
          <UserOutlined />
          <p className='pl-2 pr-10'>{quiz.createdBy.name}</p> 
          </div>
          <div className="flex items-center">
          <LikeOutlined />
          <p className='pl-2 pr-10'>{quiz.likes}</p>
          <CommentOutlined />
          <p className='pl-2'>{quiz.comments.length}</p>
          </div>
          <button className="bg-violet-700 w-[80px] h-15px] absolute right-1 bottom-1 rounded-md text-white mr-2 ">Play</button>
        
      </div>
    </div>
  );
})}
        </div>
        <div className='flex justify-center'>
        <Pagination
        pageSize={PAGE_SIZE} 
        defaultCurrent={page} 
        total={totalPages * PAGE_SIZE} 
        onChange={onChange} 
      />
      </div>
      </div>
    </div>
    

    </div>
    
    
  )

}