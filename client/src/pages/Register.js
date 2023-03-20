import React, { useContext, useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Picture, FormRow, Alert } from '../components'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useContext(AppContext)
  
  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  }

   const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return
    }
    const currentUser = {name, email, password}
    if(isMember){
      loginUser(currentUser)
    }
    else{
      registerUser(currentUser)
    }
      console.log(values);
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Picture/>
        <h3>{values.isMember ? 'Login' : "Register"}</h3>
        {showAlert && <Alert/>}
        {/* name input */}
        {!values.isMember && (
          <FormRow
          type='text'
          name="name"
          value={values.name}
          handleChange={handleChange}
          />
        )}
        
        {/* email input */}
        <FormRow
          type='email'
          name="email"
          value={values.email}
          handleChange={handleChange}
          />
        {/* password input */}
        <FormRow
          type='password'
          name="password"
          value={values.password}
          handleChange={handleChange}
          />
        <button type='submit' className="btn btn-block" disabled={isLoading}>submit</button>
        <button type='button' className="btn btn-block btn-hipster" disabled={isLoading} onClick={()=>{loginUser({email: 'test@test.com', password: 'Test123'})}}>
          {isLoading ? 'Loading' : 'Demo app'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
