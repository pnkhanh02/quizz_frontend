import React from 'react'
import MySidebar from '../../components/MySidebar';
import MyHeader from '../../components/MyHeader';
import Search from '../../components/Search';

const ExplorePage = () => {
  return (
    <div className='w-full h-[100vh] flex '>
    <MySidebar/>
    <div className='w-full h-full'>
   <MyHeader/>
   <div className='w-full h-[calc(100vh-50px)] '>
   <Search/>
    </div>
    </div>
   </div>
  )
}
export default ExplorePage;
