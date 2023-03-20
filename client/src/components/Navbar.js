import React, { useContext, useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar.js'
import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Logo from './Logo'
import { AppContext } from '../context/AppContext.js'

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const {toggleSidebar, user, logoutUser} = useContext(AppContext)
  return (
    <Wrapper>
      <div className="nav-center">
        <button 
          type='button' 
          className="toggle-btn" 
          onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button 
            type='button' 
            className='btn' 
            onClick={()=>setShowLogout(!showLogout)}>
              <FaUserCircle/>
              {user?.name}
              <FaCaretDown/>
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : 'dropdown'}>
              <button 
                type='button'
                onClick={logoutUser}
                className="dropdown-btn">Logout</button>
            </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
