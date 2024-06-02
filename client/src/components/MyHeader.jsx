import React from 'react';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';

const { Option } = Select;

const selectAfter = (
  <Select defaultValue="quiz">
    <Option value="quiz">Quiz library</Option>
    <Option value="my">My library</Option>
  </Select>
);

const MyHeader = () => {
  return (
    <div className='w-full bg-white'>
      <div className='flex justify-between items-center h-[50px]'>
       
        <div className='flex-grow py-2 px-2'>
          <Input  addonBefore={<SearchOutlined />} addonAfter={selectAfter} defaultValue="Search" />
        </div>
      </div>
    </div>
  );
}

export default MyHeader;
