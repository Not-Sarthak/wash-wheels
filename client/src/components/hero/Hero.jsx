import React from 'react'
import Button from '../buttons/Button'
import VideoButton from '../buttons/VideoButton'

const Hero = () => {
  return (
    <section id="hero" className="pt-16 pb-16 md:pt-24 md:pb-24 relative">
        <div className="container flex flex-col items-center px-6 mx-auto space-y-8 md:flex-row relative">
            <div className="md:w-1/2 text-center md:text-left md:ml-8">
                <img src="../src/assets/home/hero.jpg" alt="" className="w-full md:w-auto mt-4 md:mt-0 md:ml-8" />
            </div>
            <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-4">
                <h1 className="text-3xl md:text-5xl font-serif italic" style={{ lineHeight: '1.2' }}>
                List your <span className="text-yellow-500 font-serif text-3xl md:text-5xl">Car</span> now
                </h1>
                <h1 className="text-2xl md:text-3xl font-serif" style={{ lineHeight: '1.2' }}>
                ...or clean one🌱
                </h1>
                <p className="text-lg text-center text-gray-600 md:text-left">
                <Button text={<span style={{ fontStyle: 'italic' }}>Get Started</span>} />
                <span className="p-2"></span>
                <VideoButton text="Watch Demo" />
                </p>
            </div>
        </div>
        <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 text-center animate-bounce">
            <img src='../src/assets/home/scroll.svg' />
        </div>
    </section>
  )
}

export default Hero