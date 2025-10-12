import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-60 gap-9'>
      <h1
      className='font-extrabold text-[42px] text-center mt-24'
      >
        <span className='text-[#f12a2a]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries At Your Fingertips</h1>
      <p className='text-xl font-medium text-black text-[16px] text-center'>Your personal trip planner and travel creator, creating custom itineraries to tailored your interests and budget.</p>
      <Link to='/create-trip'>
        <Button>Get started, It's free</Button>
      </Link>

      <img src='/desktop3.png' className='-mt-30'/>
    </div>
  )
}

export default Hero
