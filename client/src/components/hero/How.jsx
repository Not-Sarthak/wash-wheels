import React from 'react'

const How = () => {
  return (
    <div className='bg-sky-100 pl-32 pr-32'>
    <div className="flex justify-center">
        <div className="w-[873px]">
            <div className="text-center">
            <span className="text-black text-[22px] font-normal font-['Nunito Sans']">Wall Street is your community exchange hub, where sharing is caring and sustainability meets fun. It's all about </span>
            <span className="text-black text-lg font-semibold font-['Noto Serif']">giving</span>
            <span className="text-black text-[22px] font-normal font-['Nunito Sans']"> and </span>
            <span className="text-black text-lg font-semibold font-['Noto Serif']">receiving</span>
            <span className="text-black text-[22px] font-normal font-['Nunito Sans']"> items that make life a little brighter.</span>
            </div>
        </div>
    </div>
    <section id="hero" className="pt-16 pb-16 md:pt-24 md:pb-24 relative">
  <div className="flex flex-col items-center px-6 mx-auto space-y-4 md:flex-row relative">
    <div className="md:w-1/2 text-center md:ml-8 md:text-left">
      <div className="w-[265px] h-[46px] flex-col justify-start items-start inline-flex ml-12 md:ml-0">
        <div className="text-black text-3xl font-serif font-['Noto Serif']">
          How does it work?
        </div>
      </div>
    </div>
    <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-4 relative">
      <img src="../src/assets/home/flowchart.svg" alt="" className="w-full md:w-auto mt-4 md:mt-0 md:ml-8" />
    </div>
    <div className="absolute bottom-0 right-0">
      <img src="../src/assets/home/corner.svg" alt="" />
    </div>
  </div>
</section>

    </div>
  )
}

export default How