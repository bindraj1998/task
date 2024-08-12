import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    const login=JSON.parse(localStorage.getItem("user"))


    if(login?.email){
           return <Navigate to="/"/>
    }
  return (
    <Outlet/>
  )
}

export default Private