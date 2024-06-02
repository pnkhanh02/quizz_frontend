import React from 'react';
import MyExplore from '../../components/MyExplore';
import MySidebar from '../../components/MySidebar';
import MyHeader from '../../components/MyHeader';


const HomePage = () => {
  return (
    
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>
   <MyExplore/>
    </div>
    </div>
   </div>

  );
};

export default HomePage;