import './hero.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0 && !scrolled) {
        setScrolled(true)
        setTimeout(redirect, 1500)
      }
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  })

  const redirect = () => {
    navigate('/portfolio')
  }

  return (
    <>
      <div className={scrolled ? 'hero scrolled' : 'hero'}>
        <h1 className='title'>
          LOREM IPSUM
        </h1>
        <span className='scroll'>
          Scroll
          <span>&#x2193;</span>
        </span>
      </div>
    </>
  )
}

export default Hero