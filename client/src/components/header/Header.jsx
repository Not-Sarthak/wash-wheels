import React from 'react'
import '../../index.css'
import Button from '../buttons/Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

  const { currentUser } = useSelector(state => state.user)  

  return (
    <>
        <nav>
            <div className="flex items-center justify-between"> 
                <div className='pt-2'>
                    <img src="../src/assets/main-logo.svg" alt="" />
                </div>
                <div className="hidden space-x-12 md:flex">
                    <a
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 relative Heading"
                    href="#"
                    style={{ fontFamily: "Nunito Sans, sans-serif" }}
                    >
                        <Link to="/home">Home</Link>
                        <span className="gradient-underline"></span>
                    </a>
                    <a
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 relative Heading"
                    href="#"
                    style={{ fontFamily: "Nunito Sans, sans-serif" }}
                    >
                        <Link to="/services">Services</Link>
                        <span className="gradient-underline"></span>
                    </a>
                    <a
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 relative"
                    href="#"
                    style={{ fontFamily: "Nunito Sans, sans-serif" }}
                    >
                        <Link to="/contact">Talk to us</Link>
                        <span className="gradient-underline"></span>
                    </a>
                    <a
                    aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 relative"
                    href="#"
                    style={{ fontFamily: "Nunito Sans, sans-serif" }}
                    >
                        <Link to="/about">About us</Link>
                        <span className="gradient-underline"></span>
                    </a>
                </div>
                <a
                href="#"
                className="hidden mr-8 p-3 px-6 pt-2 text-gray-900 bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
                >
                    
                        {currentUser ? (
                            <Link to="/profile">
                                <img src={currentUser.avatar} alt="" className='w-10 h-10 object-cover rounded-full'/>
                            </Link>
                        ) :(
                            <Link to="/sign-in">
                                <Button text="Log In" />
                            </Link>
                        )}
                    
                </a>
            </div>
        </nav>
    </>
  )
}

export default Header