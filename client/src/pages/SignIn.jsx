import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg w-full mx-auto rounded-lg shadow-md hover:shadow-xl md:p-10'>
      <h3 className='text-[22px] leading-9 font-bold mb-10'>
        Hello! <span className="text-yellow-400">Welcome</span> Back🎉
      </h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Enter E-mail'
          className='font-serif w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='font-serif w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='w-full h-12 px-4 py-2 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-white border-2 border-yellow-400 transition-all duration-300 ease-in-out'
        >
          <span className='text-lg font-semibold'>{loading ? 'Loading...' : 'Sign In'}</span>
        </button>
        <OAuth/>
      </form>
      <div className='gap-2 mt-5 flex justify-center'>
        <p className='mt-5 text-black text-center'>
          Dont have an account?  <Link to="/sign-up" className='text-yellow-500'>Sign up</Link>
        </p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}