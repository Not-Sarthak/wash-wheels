import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="text-3xl font-semibold text-center mb-4">Contact <span className='text-yellow-500'>Us</span></h2>
        <p className='mb-8 lg:mb-16 font-light text-center'>Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
        <form action="#" className='space-y-8'>
          <div>
            <label htmlFor="email" className='text-gray-500 font-semibold text-[16px] mb-2'>Your Email</label>
            <input type="email" id="email" className='mt-1 w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-gray-500 text-[16px] leading-7 text-gray-800 placeholder:text-gray-500 cursor-pointer rounded-md' />
          </div>
          <div>
            <label htmlFor="subject" className='text-gray-500 font-semibold text-[16px] mb-2'>Let us know how we can help you</label>
            <input type="text" id="subject" className='mt-1 w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-gray-500 text-[16px] leading-7 text-gray-800 placeholder:text-gray-500 cursor-pointer rounded-md' />
          </div>
          <div>
            <label htmlFor="message" className='text-gray-500 font-semibold text-[16px] mb-2'>Your Message</label>
            <textarea rows="6" type="text" id="message" placeholder="Leave a comment...." className='mt-1 w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-gray-500 text-[16px] leading-7 text-gray-800 placeholder:text-gray-500 cursor-pointer rounded-md' />
          </div>
          <button type="submit" className='w-full h-[34px] px-3 py-2.5 bg-yellow-400 rounded-[34px] items-center gap-2.5 hover:bg-white border-2 leading-[30px] border-yellow-400 transition-all duration-300 ease-in-out flex justify-center'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Contact