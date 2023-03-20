import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/BigSidebar.js'
import { AppContext } from '../context/AppContext.js'
import Logo from './Logo.js'
import NavLinks from './NavLinks.js'

const BigSidebar = () => {
  const {showSidebar, toggleSidebar} = useContext(AppContext)
  return (
   <Wrapper>
    <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
      <div className="content">
        <header>
          <Logo/>
        </header> 
        <NavLinks
        toggleSidebar = {toggleSidebar}/>
      </div>
    </div>
   </Wrapper>
  )
}

export default BigSidebar
