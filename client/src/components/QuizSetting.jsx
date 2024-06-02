import React, { useState } from 'react';
import { useStateValue } from '../contex/AppContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import quizService from '../services/quizService';
import Upload from '../assets/upload.png';


const QuizSetting = () => {

const { state, dispatch } = useStateValue();
  const { quizzes } = state;
  const navigate = useNavigate();
  const [quizInfo, setQuizInfo] = useState(quizzes);
    const [image,setImage] =useState(false);
    const [quizDetails, setQuizDetails] = useState({
        title: quizzes.title,
        imgUrl:quizzes.imgUrl,
        category: quizzes.category
    })
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e)=>{
        setQuizDetails({...quizDetails,[e.target.name]:e.target.value})
    }
    const Add_Quiz = async () => {
      console.log(quizDetails);
      let quiz = { ...quizDetails }; // Clone quizDetails to avoid direct mutation
      let responseData;
  
      // Check if image is selected
      if (image) {
        let formData = new FormData();
        formData.append('quiz', image);
  
        await fetch('http://localhost:5000/api/v1/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        })
          .then((resp) => resp.json())
          .then((data) => {
            responseData = data;
          });
  
        if (responseData.success) {
          quiz.imgUrl = responseData.image_url;
        }
      }
  
      // Update quiz title and category
      const response = await quizService.update(quizzes._id, quiz);
      console.log('Updated quiz:', response.data.data.quiz);
      dispatch({ type: 'GET_DETAILS_ONE_QUIZ', payload: response.data.data.quiz });
      navigate(`/quizDetails/${quizzes._id}`);
    };
  return (

    <div className="relative p-5 w-full flex flex-col  rounded-xl bg-yellow-200 bg-clip-border text-gray-700 shadow-md">
    <div className="flex items-center justify-center">
      <h1>QUIZ SETTING</h1>
    </div>
    <div className='add-product'>
        <div className='addproduct-itemfield w-full'>
            <p>Quiz title :</p>
            <input className="box-border w-full h-[30px]  rounded-md mb-5 pl-3 border border-gray-300 outline-none text-gray-700 text-sm" value={quizDetails.title} onChange={changeHandler} type='text' name='title' placeholder='Quiz title'/>
        </div>
        </div>
        <div className='addproduct-itemfield'>
                <p>Category :</p>
                <select value={quizDetails.category} onChange={changeHandler} name='category' className='add-product-selector box-border mb-5 w-full h-[30px]  rounded-md pl-3 border border-gray-300 outline-none text-gray-700 text-sm'>
                    <option value="all">All Category</option>
                    <option value="math">Toan hoc</option>
                    <option value="science">Khoa hoc</option>
                    <option value="languae">Ngon Ngu</option>
                    <option value="english">Tieng Anh</option>
                    <option value="sci_soc">KH_XH</option>
                    <option value="comp">May Tinh</option>
                    <option value="career">GD_NgheNghiep</option>
                    <option value="arts">Nghe Thuat</option>
                    <option value="health">Suc Khoe</option>
                </select>
            </div>
        <div className='addproduct-itemfield flex justify-center mb-5'>
        <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : quizDetails.imgUrl ? quizDetails.imgUrl : Upload}
              className="addproduct-thumnail-img rounded-xl w-24 h-24 mr-0 mb-2"
              alt=""
            />
          </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input'  hidden/>
        </div>
        <div className="flex justify-center">
        <button onClick={()=>{Add_Quiz()}} className="addproduct-btn bg-pink-700 w-[80px] h-[40px] rounded-md text-white mr-10 ">Publish</button>
    </div>
    </div>


    
  )
};

export default QuizSetting;