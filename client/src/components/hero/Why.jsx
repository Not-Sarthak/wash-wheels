import React from 'react'
import Feature from '../cards/Feature'
import '../../index.css'

const Why = () => {
  return (
    <div>
  <section id="hero" className="pt-16 pb-16 md:pt-24 md:pb-24 relative">
    <div className="container flex flex-col items-center px-6 mx-auto space-y-4 md:flex-row relative">
      <div className="md:w-1/2 text-center md:ml-8 md:text-left relative">
        <img
          src="../src/assets/home/rightcorner.svg"
          alt="Right Corner"
          className="absolute left-12 top-0 z-10 w-32 h-auto"
        />
        <div className="parent relative z-20">
          <div className="div1 transform translate-x-0 transition-transform duration-500 ease-in-out hover:translate-x-2">
            <Feature
              title={"Eco-friendly 🐝"}
              description={"Cleanliness reduces your carbon footprint."}
            />
          </div>
          <div className="div2 transform translate-x-0 transition-transform duration-500 ease-in-out hover:translate-x-2">
            <Feature
              title={"Wallet-friendly 💸"}
              description={"It's like a treasure hunt, but without the map."}
            />
          </div>
          <div className="div3 transform translate-x-0 transition-transform duration-500 ease-in-out hover:translate-x-2">
            <Feature
              title={"Community vibes 👥"}
              description={"Connect while you discover and share"}
            />
          </div>
          <div className="div4 transform translate-x-0 transition-transform duration-500 ease-in-out hover:translate-x-2">
            <Feature
              title={"Simplicity 🤷🏻‍♂️️"}
              description={"Finding what you need is just a few clicks away"}
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col font-serif text-3xl items-center md:items-end space-y-4 relative mr-32" style={{ lineHeight: "2rem" }}>
        Why Wash Wheels?
        <img src="../src/assets/home/why.svg"/>
      </div>
    </div>
  </section>
</div>


  )
}

export default Why
