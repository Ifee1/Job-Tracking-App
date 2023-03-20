import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Wrapper  from '../../assets/wrappers/DashboardFormPage'
import {Alert, FormRow} from '../../components'


const Profile = () => {
  const {user, showAlert, isLoading, displayAlert, updateUser} = useContext(AppContext)
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!name || !email || !lastName || !location){
      displayAlert()
      return
    }
    updateUser({name, email, lastName, location})
  }
  return ( 
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Profile</h2>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type= "text" name='name' value={name} handleChange={(e)=>setName(e.target.value)} />
          <FormRow type= "text" name='lastName' labelText='Last Name' value={lastName} handleChange={(e)=>setLastName(e.target.value)} />
          <FormRow type= "email" name='email' value={email} handleChange={(e)=>setEmail(e.target.value)} />
          <FormRow type= "text" name='location' value={location} handleChange={(e)=>setLocation(e.target.value)} />
          <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading ? 'Please wait ...' : 'Save Changes...'}</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
