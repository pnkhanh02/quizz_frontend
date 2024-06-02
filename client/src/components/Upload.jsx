import React, { useState } from 'react';
import Avatar from '../assets/avatarUser.png';
import quizService from '../services/quizService';
import { useNavigate } from 'react-router';
import { useStateValue } from '../contex/AppContext';

const Upload = () => {
    const { state, dispatch } = useStateValue();
  const { quizzes } = state;
  const navigate = useNavigate();
    const [image,setImage] =useState(false);
    const [quizDetails, setQuizDetails] = useState({
        name:"",
        imgUrl:"",
        category: ""
    })
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e)=>{
        setQuizDetails({...quizDetails,[e.target.name]:e.target.value})
    }
    const Add_Quiz = async ()=>{
        console.log(quizDetails);
        let quiz = quizDetails;
        let responseData
        let formData = new FormData();
        formData.append('quiz',image);

        await fetch('http://localhost:5000/api/v1/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData = data})
        if (responseData.success) {
                quiz.imgUrl = responseData.image_url;
                console.log(quiz);
                const response = await quizService.update(quizzes._id, quiz);
                console.log('Updated quiz:', response.data.data.quiz);
                dispatch({ type: 'GET_DETAILS_ONE_QUIZ', payload: response.data.data.quiz });
                navigate(`/quizDetails/${quizzes._id}`);
            }

    }
  return (

    <div className="relative p-5 w-full flex flex-col rounded-xl bg-yellow-200 bg-clip-border text-gray-700 shadow-md">
    <div className="flex items-center justify-center">
      <h1>QUIZ SETTING</h1>
    </div>
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Quiz title</p>
            <input value={quizDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here'/>
        </div>
        </div>
        <div className='addproduct-itemfield'>
                <p>Category</p>
                <select value={quizDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value="math">Toan hoc</option>
                    <option value="science">Khoa hoc</option>
                    <option value="languae">Ngon Ngu</option>
                </select>
            </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):Avatar} className='addproduct-thumnail-img rounded-full w-24 h-24 mr-0 mb-2' alt=""/>
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input'  hidden/>
        </div>
        <button onClick={()=>{Add_Quiz()}} className='addproduct-btn'>ADD</button>
    </div>


    
  )
}

export default Upload
