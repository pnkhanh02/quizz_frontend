import React from 'react'
import { useState } from 'react'
import amnhac from "../assets/nghethuat.png"
import khoahoc from "../assets/khoahoc.png"
import khoahocxahoi from "../assets/khoahocxahoi.png"
import maytinh from "../assets/maytinh.png"
import nghenghiep from "../assets/nghenghiep.png"
import ngonngu from "../assets/ngongu.png"
import suckhoe from "../assets/suckhoe.png"
import tienganh from "../assets/tienganh.png"
import toanhoc from "../assets/toanhoc.png"
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const MyExplore = () => {

  const [count, setCount] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(""); // Giá trị mặc định của nội dung

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className='h-full w-full bg-gray-100 flex items-center justify-center'>
      <div className="bg-gray-100 rounded-lg w-4/5 mx-auto my-10 p-8 flex flex-col items-center">
      <div className="w-4/5 flex items-center flex-col p-5 gap-10">
        <div><p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-800 p-5">Hôm nay bạn sẽ học gì ?</p></div>
        <div className="w-full flex items-center bg-white px-2 rounded-lg">
          <p className='bg-purple-100 w-fit min-w-max h-[30px] rounded text-purple-700 text-sm p-1 font-semibold'>{selectedTopic}</p>
          <input type="text" name="search" placeholder="Tìm kiếm quiz về bất kỳ chủ đề nào" className="w-full  bg-white p-2 text-[18px]"/>
          <Link to='/search'>
          <RightOutlined />
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between items-end gap-5 mt-10">
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Toán học")}>
            <img src={toanhoc} className="w-[50px]" alt="Toán học"></img>
            <p className="text-[10px] font-medium">Toán học</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Tiếng anh")}>
            <img src={tienganh} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">Tiếng anh</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Khoa học Xã hội")}>
            <img src={khoahocxahoi} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">Khoa học Xã hội</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Ngôn ngữ")}>
            <img src={ngonngu} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">Ngôn ngữ</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Khoa học")}>
            <img src={khoahoc} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">Khoa học</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Máy tính")}>
            <img src={maytinh} className="w-[50px]"></img>
            <p className="text-[10px] font-medium" >Máy tính</p>
          </a>
        </div>
        <div >
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("GD nghề nghiệp")}>
            <img src={nghenghiep} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">GD nghề nghiệp</p>
          </a>
        </div>
        <div>
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Nghệ thuật sáng tạo")}>
            <img src={amnhac} className="w-[50px]"></img>
            <p className="text-[10px] font-medium ">Nghệ thuật sáng tạo</p>
          </a>
        </div>
        <div>
          <a className="flex flex-col items-center gap-1 hover:text-purple-500" onClick={() => handleTopicClick("Sức khỏe & thể chất")}>
            <img src={suckhoe} className="w-[50px]"></img>
            <p className="text-[10px] font-medium">Sức khỏe & thể chất</p>
          </a>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default MyExplore