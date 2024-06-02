import { Checkbox, Progress, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaSort } from "react-icons/fa";
import { DeleteOutlined} from "@ant-design/icons"
import { useStateValue } from '../contex/AppContext';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import quizService from '../services/quizService';


const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


export default function Report() {

  const {state,dispatch} = useStateValue();

  const {user,quizzes} = state;
  const [allUsers, setAllUers] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [scores, setScores] = useState(); 
  const getUsers = async() =>{

    try {
      console.log("getAllUser function executed");
      const response = await authService.getAllUsers();   
      console.log("response allUsers la :",response.data.data);
      setAllUers(response.data.data);
      
} catch (error) {
      toast.error(error)}
}
useEffect(()=>{ 
getUsers();
  },[])

  const getQuizzes = async() =>{

    try {
      console.log("getAllQuizzes function executed");
      const response = await quizService.getAll();   
      console.log("response all quizzes la :",response.data);
      setAllQuizzes(response.data.data.quizzes);
      setScores(response.data.sumScore);
} catch (error) {
      toast.error(error)}
}
useEffect(()=>{ 
getQuizzes();
  },[])


  return (
    <div className=' w-full h-full bg-gray-100 p-4 flex-col items-center '>

<div className="flex flex-col justify-between items-center pt-4">
            <div className="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                
                <div className="relative flex flex-grow !flex-row  items-center  rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600">Total Account</p>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">{allUsers?.length}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row  items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600">Total Quizzes</p>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">{allQuizzes?.length}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row items-center  rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            className="h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600">Take Quiz</p>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">{scores}</h4>
                    </div>
                </div>
                </div> 
            
        </div>









                   
            <div className="bg-white p-4 m-2 rounded-md">
            <div className='flex items-center justify-between'>
                <h2 className="text-gray-500 text-lg font-semibold pb-4">Accounts Table </h2>

                <Select
      defaultValue="All Time"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'Today',
          label: 'Today',
        },
        {
          value: 'Yesterday',
          label: 'Yesterday',
        },
        {
          value: 'Last week',
          label: 'Last week',
        },
        {
            value: 'This month',
            label: 'This month',
          },
          {
            value: 'Last month',
            label: 'Last month',
          },
          {
            value: 'This year',
            label: 'This year',
          },
          {
            value: 'All time',
            label: 'All time',
          },
        
      ]}
      />
      </div>
                <div className="my-1"></div> 
                <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
                <table className="w-full table-auto text-sm">
                    <thead>
                    <tr className="text-sm leading-normal">
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light"><DeleteOutlined className=' hover:text-red-500 '/></th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Avatar</th>
                            <th className="w-1/4 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">User</th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                            <div className='flex items-center justify-center'>
                            <span>Joined</span> 
                            <button><FaSort /></button>
                            </div>
                                </th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                            <div className='flex items-center justify-center'>
                <select value="" onChange="" name='role' className='add-product-selector box-border  w-[120px] h-[30px]  rounded-md pl-3 border border-gray-300 outline-none text-gray-700 text-sm'>
                    <option value="all">All Account</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                    </div>
                            </th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                            <div className='flex items-center justify-center'>
                            <span>Created</span> 
                            <button><FaSort /></button>
                            </div>
                                </th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                            <div className='flex items-center justify-center'>
                            <span>Take Quiz</span> 
                            <button><FaSort /></button>
                            </div>
                                </th>
                            <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                            <div className='flex items-center justify-center'>
                            <span>Accuracy</span> 
                            <button><FaSort /></button>
                            </div>
                                </th>
                        </tr>

                    </thead>
                    
                    <tbody>
                    {allUsers && Array.isArray(allUsers) && allUsers.map((user,index)=> {
    const createdAt = new Date(user.createdAt);
    const day = createdAt.getDate();
    const month = createdAt.getMonth() + 1;
    const year = createdAt.getFullYear();
    const formattedDate = `${year}/${month}/${day}`;
    return(
        <tr key={index} className="hover:bg-grey-lighter">
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center"><Checkbox  onChange=""/></td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center pl-10"><img src={user.avatar} alt="avatar" className="rounded-full h-10 w-10"/></td>
            <td className="w-1/4 py-2 px-4 border-b border-grey-light text-center">{user.name}</td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{formattedDate}</td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{user.isAdmin?"Admin":"User"}</td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{user.quizCount}</td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{user.scoreCount}</td>
            <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">
            <Progress type="circle" percent={30} size={40} />
            </td>
        </tr>
       
    )})}

                    </tbody>
                    </table>
                    
                   
                </div>

              
                     <div className="bg-white p-4 m-2 rounded-md mt-4">
                     <div className='flex items-center justify-between'>
    <h2 className="text-gray-500 text-lg font-semibold pb-4">Quizzes Table</h2>
    <Select
      defaultValue="All Time"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'Today',
          label: 'Today',
        },
        {
          value: 'Yesterday',
          label: 'Yesterday',
        },
        {
          value: 'Last week',
          label: 'Last week',
        },
        {
            value: 'This month',
            label: 'This month',
          },
          {
            value: 'Last month',
            label: 'Last month',
          },
          {
            value: 'This year',
            label: 'This year',
          },
          {
            value: 'All time',
            label: 'All time',
          },
        
      ]}
      />
      </div>

    <div className="my-1"></div> 
    <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div> 
    <table className="w-full table-auto text-sm">
        <thead>
            <tr className="text-sm leading-normal">
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light"><DeleteOutlined className=' hover:text-red-500 '/></th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Image</th>
                <th className="w-1/4 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Title</th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light ">
                    <div className='flex items-center justify-center'>
                    <span>Author</span> 
                    </div>
                    </th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light  ">
                <div className='flex items-center justify-center'>
                <select value="" onChange="" name='category' className='add-product-selector box-border  w-[140px] h-[30px]  rounded-md pl-3 border border-gray-300 outline-none text-gray-700 text-sm'>
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
                    </th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light  ">
                    <div className='flex items-center justify-center'>
                    <span>Take Quiz</span> 
                    <button><FaSort /></button>
                    </div>
                    </th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light  ">
                    <div className='flex items-center justify-center'>
                    <span>Comment</span> 
                    <button><FaSort /></button>
                    </div>
                    </th>
                <th className="w-1/8 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light  ">
                    <div className='flex items-center justify-center'>
                    <span>Like</span> 
                    <button><FaSort /></button>
                    </div>
                    </th>
            </tr>
        </thead>
        <tbody>
        { allQuizzes && Array.isArray(allQuizzes) && allQuizzes.map((quiz,index)=> {
          const createdAt = new Date(quiz.createdAt);
          const day = createdAt.getDate();
          const month = createdAt.getMonth() + 1;
          const year = createdAt.getFullYear();
          const formattedDate = `${year}/${month}/${day}`;
          return(
            <tr key={index} className="hover:bg-grey-lighter">
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center"><Checkbox  onChange=""/></td>
                <td className="w-1/8 py-2 pl-10 px-4 border-b border-grey-light text-center"><img src={quiz.imgUrl} alt="Foto Perfil" className="rounded-lg h-10 w-10"/></td>
                <td className="w-1/4 py-2 px-4 border-b border-grey-light text-left font-bold">{quiz.title}</td>
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{quiz.createdBy.name}</td>
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{quiz.category}</td>
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{quiz?.scoreCount}</td>
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{quiz?.comments?.length}</td>
                <td className="w-1/8 py-2 px-4 border-b border-grey-light text-center">{quiz.likes}</td>
            </tr>
           
          )})}
        </tbody>
    </table>
    
    
                </div>
    </div>
  )
}
