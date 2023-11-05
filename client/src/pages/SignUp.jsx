import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md hover:shadow-xl md:p-10 p-20'>
        <h3 className='text-[22px] leading-9 font-bold mb-10'>
          Get Onboard with <span className="text-yellow-400">Wash Wheels 🛞</span>
        </h3>
      <form onSubmit={handleSubmit} className='py-4 md:py-0'>
        <div className="mb:5">
          <input
            type='text'
            placeholder='Enter Username'
            className='font-serif w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer'
            id='username'
            onChange={handleChange}
          />
        </div>
        <div className="mb:5">
          <input
            type='email'
            placeholder='Enter E-mail'
            className='font-serif w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='mb:5'>
          <input
            type='password'
            placeholder='Password'
            className='font-serif w-full py-3 border-b border-solid border-yellow-300 focus:outline-none focus:border-b-yellow-300 text-[16px] leading-7 text-black placeholder:text-gray-600 cursor-pointer'
            id='password'
            onChange={handleChange}
          />
        </div>
        <div className="mt-7">
          <button
            disabled={loading}
            className='w-full h-12 px-4 py-2 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-white border-2 border-yellow-400 transition-all duration-300 ease-in-out'
          >
            <span className='text-lg font-semibold'>{loading ? 'Loading...' : 'Sign Up'}</span>
          </button>
        </div>
        <div className='mt-7'>
          <OAuth/>
        </div>
        <p className='mt-5 text-black text-center'>
          Already have an account?  <Link to="/sign-in" className='text-yellow-500'>Log-In</Link>
        </p>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </section>
  );
}