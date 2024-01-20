import React from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineMenuOpen } from 'react-icons/md'

const LogoSection = ({isToggle, setIsToggle}) => {
  return (
    <div className='flex flex-row justify-between items-center py-2 text-white px-3'>
      {/* Logo */}
      <div>
        <span className='hidden sm:flex text-3xl text-center'>Lorem Ipsum</span>
        <span className='flex sm:hidden text-xl'>{ isToggle ? "Lorem Ipsum" : "LI"}</span>
      </div>
      {/* Toggle Button */}
      <span onClick={() => setIsToggle(!isToggle)} className='flex sm:hidden'>
        {isToggle ? <MdOutlineMenuOpen className='w-6 sm:w-8 h-6 sm:h-8'/> : <HiMenuAlt3 className='w-6 sm:w-8 h-6 sm:h-8'/>}
      </span>
    </div>
  )
}

export default LogoSection