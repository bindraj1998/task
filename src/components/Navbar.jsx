import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate=useNavigate()
    const login=JSON.parse(localStorage.getItem("user"))
    console.log("login",login)

    const handledelete=()=>{
        localStorage.removeItem("user")
        navigate("/signin")
    }
  return (
    <div style={{display:"flex" ,width:"50%",margin:"auto",justifyContent:"space-between"}}>
         <Link to="/">Home</Link>

        {login?.email?<div><button onClick={handledelete}>Logout</button></div>:<div> <Link to="/signup">SignUp</Link>
            <Link to="/signin">Signin</Link></div>}
    
    </div>
  )
}

export default Navbar