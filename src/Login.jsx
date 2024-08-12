import React from 'react'


import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
const useForm = (initialValues, validate) =>{
        const navigate=useNavigate()
        const [values, setValues] = useState(initialValues); 
        const [errors, setErrors] = useState({}); 
        const [isSubmitting, setIsSubmitting] = useState(false);
         const handleChange = (event) => { const
             { name, value } = event.target; setValues({ ...values, [name]: value, }); 
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
    
      storedValues.push(values);
      localStorage.setItem('UserValues', JSON.stringify(storedValues));
      navigate("/login")     
    }
                 };
                 
                 const resetForm = () => { setValues(initialValues); setErrors({}); setIsSubmitting(false); };
                  return { values, errors, isSubmitting, handleChange, handleSubmit, resetForm, }; 
                
                }


                const validate = (values) => { 
                    const errors = {}; 

                    if (!values.firstname) { errors.firstname = 'firstname is required'; }
                    if (!values.lastname) { errors.lastname = 'lastname is required'; }
                    if (!values.email){ errors.email = 'Email is required'; }
                 else if (!/\S+@\S+\.\S+/.test(values.email)) { errors.email = 'Email address is invalid'; } 
                 if (!values.password) { errors.password = 'Password is required'; }
                  else if (values.password.length < 6) { errors.password = 'Password must be at least 6 characters'; } 
                  if (!values.phonenumber) {
                    errors.phonenumber = 'Phone number is required';
                  } else if (!/^\d{10}$/.test(values.phonenumber)) {  // Simple validation for 10-digit phone number
                    errors.phonenumber = 'Phone number must be 10 digits';
                  }
                  return errors; 
            };

function LoginForm() {
    const initialState = {
        firstname:"",
        lastname:"",
        phonenumber:"",
      email: "",
      password: "",
    };
  
    const { handleChange, handleSubmit, values, errors, isSubmitting } =useForm(initialState, validate);
    
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>FirstName</label>
          <input
            type="text"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div>
          <label>LastName</label>
          <input
            type="text"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>




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
        </div>
        <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          value={values.phonenumber}
          onChange={handleChange}
        />
        {errors.phonenumber && <p>{errors.phonenumber}</p>}
      </div>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
  
  export default LoginForm;