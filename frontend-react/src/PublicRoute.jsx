import React, { Children } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const PublicRoute = ({children}) => {
      const {isLoggedIN}=useContext(AuthContext)
  return !isLoggedIN ?(children):(<Navigate to='/dashboard'/>)
}

export default PublicRoute
