import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'


const Error = () => {
  return (
    <Wrapper className="full-page">
      <div >
        <img src={img} alt="not found" />
        <h3>ooh, page not found</h3>
        <p>We can't find the page.</p>
        <Link to={'/'}>back to home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
