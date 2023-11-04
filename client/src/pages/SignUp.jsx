import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className='text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className="text-yellow-400">Welcome</span> Back🎉
        </h3>
        <form className='py-4 md:py-0'>
          <div className="mb-5">
            <input type="name" placeholder="Enter Username" name="name" value={formData.email} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer' required/>
          </div>
          <div className="mb-5">
            <input type="email" placeholder="Enter your Email" name="email" value={formData.email} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer' required/>
          </div>
          <div className="mb-5">
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer' required/>
          </div>

          <div className="mt-7">
            <button type="submit" className="w-full h-[34px] px-3 py-2.5 bg-yellow-400 rounded-[34px] items-center gap-2.5 hover:bg-white border-2 leading-[30px] border-yellow-400 transition-all duration-300 ease-in-out flex justify-center">Sign Up</button>
          </div>
          <p className='mt-5 text-black text-center'>
            Already have an account?  <Link to="/sign-in" className='text-yellow-500'>Log-In</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default SignUp