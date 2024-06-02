import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Progress, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaSort } from 'react-icons/fa'
import { useStateValue } from '../contex/AppContext';
import quizService from '../services/quizService';
import { toast } from 'react-toastify';


const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
const Dashboard = () => {
  const {state,dispatch} = useStateValue();

  const {user,quizzes} = state;
  const [scoreDetail, setScoreDetail] = useState();
  const [selectedScores, setSelectedScores] = useState([]);

  const getDashBoard = async() =>{

    try {
      console.log("getMyDashBoard function executed",user.user._id,);
      const response = await quizService.getMyDashBoard(user.user._id,);   
      console.log("response dashboard la :",response.data.data.scores);
      setScoreDetail(response.data.data.scores);
      
} catch (error) {
      toast.error(error)}
}
useEffect(()=>{ 
getDashBoard();
  },[])

  const handleCheckBoxChange = (scoreId) => {
    
    setSelectedScores((prevSelectedScores) => {
      if (prevSelectedScores.includes(scoreId)) {
        return prevSelectedScores.filter((id) => id !== scoreId);
      } else {
        return [...prevSelectedScores, scoreId];
      }
      
    });
    
  };
  useEffect(() => {
    console.log('selectedScores:', selectedScores);
  }, [selectedScores]);

 
  const handleDeleteSelected = async () => {
    try {
      const data = {
        scoreId: selectedScores
      };
  
      console.log('Deleting selected scores:', data);
      const response = await quizService.deleteScores(data);
  
      if (response.status === 200) {
        console.log('Deleting scores:', response.data);
        // Hiển thị thông báo thành công cho người dùng
        toast.success('Scores deleted successfully');
  
        // Cập nhật state hoặc thực hiện các thao tác khác sau khi xóa thành công
        setScoreDetail((prevScoreDetail) =>
          prevScoreDetail.filter((score) => !selectedScores.includes(score._id))
        );
  
        // Xóa các score đã chọn khỏi selectedScores
        setSelectedScores([]);
      } else {
        console.error('Error deleting scores:', response.data.error);
        // Hiển thị thông báo lỗi cho người dùng
        toast.error('Failed to delete scores');
      }
    } catch (error) {
      console.error('Error deleting scores:', error);
      // Hiển thị thông báo lỗi cho người dùng
      toast.error('Failed to delete scores');
    }
  };
  
  

  


  return (
    <div className=' w-full h-full bg-gray-100 p-4 flex-col items-center justify-center'>


              
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
                <th className="w-1/12 py-2 px-1 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light"><DeleteOutlined onClick={handleDeleteSelected} className='hover:text-red-500'  /></th>
                <th className="w-1/6 py-2 px-1 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Image</th>
                <th className="w-1/3 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Title</th>
                <th className="w-1/6 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                <div className='flex items-center justify-center'>
                <select value="" onChange="" name='category' className='add-product-selector box-border  w-full h-[30px]  rounded-md pl-3 border border-gray-300 outline-none text-gray-700 text-sm'>
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
                <th className="w-1/6 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                <div className='flex items-center justify-center'>
                    <span>Take Quiz</span> 
                    <button><FaSort /></button>
                    </div>
                    </th>
                <th className="w-1/6 py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                <div className='flex items-center justify-center'>
                    <span>Accuracy</span> 
                    <button><FaSort /></button>
                    </div>
                    </th>
            
            </tr>
        </thead>
        <tbody>
        {scoreDetail?.map((score,index)=> {
            const createdAt = new Date(score.createdAt);
            const day = createdAt.getDate();
            const month = createdAt.getMonth() + 1;
            const year = createdAt.getFullYear();
            const formattedDate = `${year}/${month}/${day}`;
           return (
            <tr key={index} className="hover:bg-grey-lighter">
                <td className="py-2 px-1 border-b border-grey-light  w-1/12 text-center">  <Checkbox onChange={() => handleCheckBoxChange(score._id)} /></td>
                <td className="py-2 px-1 border-b border-grey-light w-1/6  pl-14"><img src={score?.quizId.imgUrl} alt="quizImg" className="h-10 rounded-lg w-10"/></td>
                <td className="py-2 px-4 border-b border-grey-light w-1/3 text-left font-bold">{score?.quizId.title}</td>
                <td className="py-2 px-4 border-b border-grey-light  w-1/6 text-center">{score?.quizId.category}</td>
                <td className="py-2 px-4 border-b border-grey-light  w-1/6 text-center">{formattedDate}</td>
                <td className="py-2 px-4 border-b border-grey-light  w-1/6 text-center">
                <Progress type="circle" percent={30} size={40} />
                </td>
            </tr>
           )
          })} 
        </tbody>
    </table>
    
    
                </div>
    </div>
                
 
  )
}

export default Dashboard
