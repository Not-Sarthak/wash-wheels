import React from 'react'

const Feature = ({ title, description }) => {
  return (
    <div className="CardEcoFriendly w-[227px] h-[133px] px-6 py-[30px] bg-white rounded-xl border-2 border-slate-300 flex-col justify-start items-center gap-5 inline-flex">
      <div className="EcoFriendly text-black text-base font-semibold font-['Noto Serif'] italic">
        {title}
      </div>
      <div className="SharingItemsReducesYourCarbonFootprint w-[179px] text-black text-md font-normal font-['Nunito Sans'] justify-center text-center">
        {description}
      </div>
    </div>
  )
}

export default Feature