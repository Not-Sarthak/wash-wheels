import React from 'react'
import Item from '../components/cards/Item'
import ItemButton from '../components/buttons/ItemButton'
import Search from '../components/buttons/Search'

const Service = () => {
  return (
    <section className='bg-[#FFFFFF]'>
        <div className='container text-center'>
          <h2 className='font-serif ml-16 text-3xl'>Claim your <span className='text-yellow-500 italic'>item</span></h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#F5F5F5] rounded-md flex">
            <ItemButton text="Sort" />
            <input
              type="search"
              className='w-[536px] h-[29.19px] pl-3 pr-[230px] py-1.5 rounded-xl border border-zinc-400 justify-start items-center gap-[15px] inline-flex text-zinc-400 text-lg font-normal font-serif'
              placeholder='Search for an Item'
              />
            <Search />
            <ItemButton text="Filter" />
          </div>
        </div>
    </section>
  )
}

export default Service