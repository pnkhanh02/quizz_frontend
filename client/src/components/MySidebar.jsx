import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import avatarUser from '../assets/avatarUser.png';
import logo from '../assets/logo.png';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Modal } from 'antd';
import { BankOutlined, CameraOutlined, FundOutlined, LogoutOutlined, MonitorOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useStateValue } from '../contex/AppContext';
import { toast } from 'react-toastify';

const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const MySidebar = () => {
  const { state, dispatch } = useStateValue();
  const { user, avatar } = state || {};
  const navigate = useNavigate();
  
  const sigOut = () => {
    // Assuming you want to clear some local state or perform actions on sign out
    dispatch({ type: "UPDATE_AVATAR", payload: null });
    dispatch({ type: "UPDATE_COMMENT", payload: null });
    dispatch({ type: "CURRENT_USER", payload: null });
    navigate('/');
  };
  
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const createOneQuiz = async () => {
    try {
      const defaultQuiz = {
        quiz: {
          title: "Quiz Name",
          category: "Select Category" 
        },
        createdBy: user?._id, 
      };
      console.log('new quiz', defaultQuiz);
      // You can implement your quiz creation logic here or mock it
      toast.success("Quiz created successfully!");
      navigate('/newQuiz/someQuizId'); // Change 'someQuizId' to the actual quiz ID if available
    } catch (error) {
      toast.error(error.message);
    } 
  };

  return (
    <div className='h-screen w-[300px] bg-gray-800'>
      <div className='bg-white h-[50px]'>
        <div className='text-xl font-bold text-center flex items-center justify-center text-red h-full'>
          <img src={logo} alt="logo" className='w-[130px]' />
        </div>
      </div>
      <div className='flex flex-col justify-between h-[calc(100vh-3rem)] bg-white'>
        <div className='menu-man text-left whitespace-nowrap'>
          <div className='profile flex justify-center items-center text-center p-5'>
            <div className='text-center'>
              <div className='flex items-end'>
                <img src={avatar || avatarUser} alt="Avatar" className="rounded-full w-24 h-24 mr-0 mb-2" />
                <Link to="/profile">
                  <CameraOutlined className='mb-4 ml-0 cursor-pointer' />
                </Link>
              </div>
              {user ? (
                <>
                  <h5 className='text-xl font-medium leading-tight mb-2'>{user.name}</h5>
                  <p className='text-gray-600'>{user.isAdmin ? "Admin" : "User"}</p>
                </>
              ) : (
                <h5 className='text-xl font-medium leading-tight mb-2'>Guest</h5>
              )}
            </div>
          </div>
          <div className='flex justify-center py-2'>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg, ${colors2.join(', ')})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colors2).join(', ')})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colors2).join(', ')})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={createOneQuiz} type="primary" size="large" className='flex items-center justify-center py-2 w-[200px] h-[50px]'>
                <PlusCircleOutlined />
                CREATE
              </Button>
            </ConfigProvider>
          </div>

          <div className="py-3 w-full cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
            <Link to="/homepage" className="px-7 flex space-x-2">
              <MonitorOutlined />
              <span>Explore</span>
            </Link>
          </div>

          <div className="py-3 w-full cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
            <Link to="/dashboard" className="px-7 flex space-x-2">
              <FundOutlined />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="py-3 cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
            <Link to={`/createdByMe/${user?._id}`} className="px-7 flex space-x-2">
              <BankOutlined />
              <span>My Library</span>
            </Link>
          </div>

          {user?.isAdmin && (
            <>
              <div className="py-3 cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
                <Link to="/adminpage" className="px-7 flex space-x-2">
                  <FundOutlined />
                  <span>Report</span>
                </Link>
              </div>

              <div className="py-3 cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
                <Link to="/test" className="px-7 flex space-x-2">
                  <FundOutlined />
                  <span>TestComponent</span>
                </Link>
              </div>
            </>
          )}

          <div className="py-3 cursor-pointer text-gray-600 hover:text-white hover:bg-gray-300">
            <span onClick={sigOut} className="px-7 flex space-x-2">
              <LogoutOutlined />
              <span>Logout</span>
            </span>
          </div>
        </div>
      </div>
      <Modal title="Upload Avatar" visible={isVisibleModal}>
        <p>Are you sure ?</p>
      </Modal>
    </div>
  );
}

export default MySidebar;
