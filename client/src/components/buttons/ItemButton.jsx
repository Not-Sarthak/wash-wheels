import React from 'react'


const ItemButton = ({text}) => {
  return (
    <div className="ml-2 mr-2 px-3 bg-slate-400 bg-opacity-30 rounded-xl justify-start items-start gap-2 inline-flex">
      <button className='text-neutral-700 text-lg font-normal font-serif'>{text}</button>
    </div>
  )
}

export default ItemButton