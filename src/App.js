import logo from './logo.svg';
import './App.css';
import LoginForm from './Login';
import {BrowserRouter as Router, Route, useNavigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Private from './components/Private';
   
function App() {   
  const login=JSON.parse(localStorage.getItem("user"))
  const navigate=useNavigate()
  return (
    <div className="App">
      <Navbar/>

        
  
         
       
       <Routes>
         <Route path="/" element={<Home/>}/>
         
         <Route path="/" element={<Private/>}>
         <Route path="/signup" element={<LoginForm/>}/>
         <Route path="/signin" element={<Login/>}/>
         </Route>
       

      
       </Routes>

    </div>
  );
}

export default App;
