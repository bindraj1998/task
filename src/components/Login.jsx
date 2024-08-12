import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const useForm = (initialValues, validate) =>{
    const navigate=useNavigate()
    const [values, setValues] = useState(initialValues); 
    const [errors, setErrors] = useState({}); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [loginError,setloginError]=useState("")
     const handleChange = (event) => { 
        const { name, value } = event.target; 
         setValues({ ...values, [name]: value, }); 
        }; 


        const handleSubmit = (event) => {
              event.preventDefault();
            //   setErrors(validate(values));
            //    setIsSubmitting(true);

               const validationErrors = validate(values);
setErrors(validationErrors);

const noErrors = Object.keys(validationErrors).length === 0;
setIsSubmitting(noErrors);

if (noErrors) {
    console.log('Form Values:', values);
    const storedValues = JSON.parse(localStorage.getItem('UserValues')) || [];

    const user = storedValues.find((user) => user.email === values.email);

    if (user) {
     
      if (user.password === values.password) {
        console.log('Login successful!', values);
           navigate("/")
           localStorage.setItem("user",JSON.stringify(user))
           setloginError('');  
      } else {
        console.log('Password is incorrect!');
        setloginError('Password not valid');
      }
    } else {
      console.log('Email not found!');
      setloginError('Email not valid');
    }
  
      
}
             };
             
          const resetForm = () => { setValues(initialValues); setErrors({}); setIsSubmitting(false); };
           return { values, errors, isSubmitting, handleChange, handleSubmit, resetForm,loginError }; 
            
            }    

    
const validate = (values) => { 
    const errors = {}; 
    if (!values.email){ errors.email = 'Email is required'; }
 else if (!/\S+@\S+\.\S+/.test(values.email)) { errors.email = 'Email address is invalid'; } 
 if (!values.password) { errors.password = 'Password is required'; }
  else if (values.password.length < 6) { errors.password = 'Password must be at least 6 characters'; } 
  
  return errors; 
};
const Login = () => {


    const initialState = {
      email: "",
      password: "",
    };
    const { handleChange, handleSubmit, values, errors, isSubmitting,loginError } =useForm(initialState, validate);
  return (
    <div>
         <form onSubmit={handleSubmit}>
        <div>
    <label>Email</label>
    <input
      type="email"
      name="email"
      value={values.email}
      onChange={handleChange}
    />
    {errors.email && <p>{errors.email}</p>}
  </div>
  <div>
    <label>Password</label>
    <input
      type="password"
      name="password"
      value={values.password}
      onChange={handleChange}
    />
    {errors.password && <p>{errors.password}</p>}

    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
  </div>
  <button type="submit">
          Submit
        </button>
      </form>
  
  </div>
  
  )
}

export default Login