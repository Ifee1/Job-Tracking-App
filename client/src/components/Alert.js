import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Alert = () => {
  const {alertType, alertText} = useContext(AppContext)
  return (
    <div className={`alert alert-${alertType}`}>
      {alertText}
    </div>
  )
}

export default Alert
