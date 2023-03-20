import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Picture } from '../components'
import { AppContext } from '../context/AppContext'


const LandingPage = () => {
  const {user} = useContext(AppContext)

  return (
    <React.Fragment>
     {user && <Navigate to='/'/>}
      <Wrapper>
          <nav>
              <Picture/>
          </nav>
          <div className="container page">
              {/* info */}
              <div className="info">
              <h1>job <span>tracking</span> app</h1>
              <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero enim aliquid saepe qui nemo eum reprehenderit quos expedita provident reiciendis.
              </p>
              <Link to={'/register'} className='btn btn-hero'>login/register</Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
          </div>
      </Wrapper>
    </React.Fragment>
  )
}



export default LandingPage
