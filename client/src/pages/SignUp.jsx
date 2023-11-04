import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 p-20'>
        <h3 className='text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className="text-yellow-400">Welcome</span> Back🎉
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
            className='w-full h-[34px] px-3 py-2.5 bg-yellow-400 rounded-[34px] items-center gap-2.5 hover:bg-white border-2 leading-[30px] border-yellow-400 transition-all duration-300 ease-in-out flex justify-center'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>
        <p className='mt-5 text-black text-center'>
          Already have an account?  <Link to="/sign-in" className='text-yellow-500'>Log-In</Link>
        </p>
        {/* <OAuth/> */}
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </section>
  );
}