import React from 'react'
import Navbar from '../../components/Navbar'
import LoginRegister from '../../components/LoginRegister'
import './style.css'

const LoginRegisterPage = () => {
  return (
    <div className='w-full h-full'>
   <Navbar/>
   <div className='w-full h-[calc(100vh-50px)]'>
    <LoginRegister/>
    </div>
    </div>
  )
}

export default LoginRegisterPage
