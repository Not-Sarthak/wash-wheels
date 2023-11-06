import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = ({text}) => {
  return (
    <div className="ml-2 mr-2 px-3 bg-slate-400 bg-opacity-30 rounded-xl flex items-center gap-2">
    <button className='text-neutral-700 text-lg font-normal font-serif flex items-center'>
        <AiOutlineSearch />
        <div className='ml-2'>Search</div>
    </button>
    </div>

  )
}

export default Search