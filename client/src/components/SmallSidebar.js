import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { AppContext } from '../context/AppContext.js'
import Logo from './Logo.js'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const {toggleSidebar, showSidebar} = useContext(AppContext)
  return (
    <Wrapper>
        <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
          <div className="content"> 
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
            <header>
              <Logo/>
            </header>
           <NavLinks
           toggleSidebar={toggleSidebar}
           />
          </div>
        </div>
    </Wrapper>
  )
}

export default SmallSidebar
