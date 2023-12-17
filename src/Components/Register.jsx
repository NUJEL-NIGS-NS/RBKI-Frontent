import React, { useContext, useState } from 'react'
import '../CSS/register.css'
import axios from 'axios';
import { BaseUrl } from '../constant/BaseUrl';
import { AuthContext } from '../constant/AppContext';
export const Register = () => {

  const { updateToken } = useContext(AuthContext)

  

  const [FieldError, setFieldError] = useState(false)
  const [error, seterror] = useState(false)

  const handleRegisterForm = async (event) => {
    event.preventDefault();
    setFieldError(false);
    seterror(false);
    const data = {
      user_name: event.target.username.value,
      email: event.target.email.value,
      department: event.target.department.value,
      password: event.target.password.value,
      password2: event.target.password2.value,
      security: event.target.Security.value,

    }
    try {
      const response = await axios.post(`${BaseUrl}auth/register`, data)
      console.log(response.data)
      if (response.data.Error) {
        setFieldError({ ...response.data.Error })
      }
      if (response.data.token) {
        updateToken(response.data.token)
      }
      if (response.data.Message) {
        alert(response.data.Message)
      }
    } catch (error) {
      if (error.response) {
        // The error response was received from the server
        console.log(error.response.data);
        seterror(error.response.data);

        // console.log(error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("No response received from the server");
      } else {
        // Something else went wrong
        console.log("Error:", error.message);
      }

    }


  }

  return (
    <div>
      <form className='RegisterForm' onSubmit={handleRegisterForm}>
        <h1>User Register</h1>
        <label htmlFor="username"> Username</label>
        <input type="text" id='username' name='username' />
        {FieldError.user_name ? <small>`*{FieldError.user_name[0]}`</small> : null}

        <label htmlFor="e-mail"> E-mail </label>
        <input type="email" id='e-mail' name='email' />
        {FieldError.email ? <small>`*{FieldError.email[0]}`</small> : null}

        <label htmlFor="department">Department</label>
        <input type="text" id='department' name='department' />
        {FieldError.department ? <small>`*{FieldError.department[0]}`</small> : null}


        <label htmlFor="password">Password</label>
        <input type="password" id="password" name='password' />
        {FieldError.password ? <small>`*{FieldError.password[0]}`</small> : null}



        <label htmlFor="password2">Confirm Password</label>
        <input type="password" id="password2" name='password2' />
        {FieldError.password2 ? <small>`*{FieldError.password2[0]}`</small> : null}


        <label htmlFor="Security">Security Id</label>
        <input type="password" id='Security' name='Security' />
        {FieldError.security ? <small>`*{FieldError.security[0]}`</small> : null}
         {error?<small>{error}</small>:null}

        <button>Register</button>
      </form>
    </div>
  )
}
