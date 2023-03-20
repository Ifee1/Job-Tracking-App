import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/Loading'

const ProtectedRoute = ({children}) => {
    const {user, userLoading} = useContext(AppContext)

    if (userLoading) return <Loading/>
    if(!user){
        return <Navigate to='/landing'/>
    }
    return children
  
}

export default ProtectedRoute
