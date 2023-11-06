import React from 'react'
import Button from '../buttons/Button'

const Footer = () => {
  return (
    <section id="hero" className="md:pt-12 md:pb-12 relative">
      <div className="flex flex-col items-center px-6 mx-auto space-y-4 md:flex-row relative">
        <div className="md:w-1/2 text-center md:text-left">
          <div className='ml-12'>
            <h1 className="text-2xl md:text-2xl font-serif text-yellow-500" style={{ lineHeight: '1.6' }}>
              Get on board with Wash Wheels
            </h1>
            <div className="font-serif text-sm md:text-sm" style={{ lineHeight: '2.8' }}>
              Clean your car with the comfort of your Home! 🌍✨
            </div>
            <div style={{ lineHeight: '3.6' }}>
              <Button text="Get Started" />
            </div>
          </div>
        </div>
    <div className="md:w-1/2 flex flex-col md:items-start space-y-4 relative font-serif mr-12">
      <div className="w-[395px] h-[49px] flex-col justify-start items-end ml-auto gap-5 inline-flex">
        <div className="text-black text-[22px]">Quick links</div>
        <div className="justify-center items-start gap-[30px] inline-flex">
          <div className="justify-center items-center gap-2.5 flex">
            <div className="text-black text-sm">Home</div>
          </div>
          <div className="justify-center items-center gap-2.5 flex">
            <div className="text-black text-sm font-normal">Services</div>
          </div>
          <div className="justify-center items-center gap-2.5 flex">
            <div className="text-black text-sm font-normal">Talk to us</div>
          </div>
          <div className="justify-center items-center gap-2.5 flex">
            <div className="text-black text-sm font-normal">About us</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Footer
