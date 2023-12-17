import React, { useState } from 'react'
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import axios from 'axios'
import { BaseUrl } from '../constant/BaseUrl'
import { AuthContext } from '../constant/AppContext'
import { useContext } from 'react'
import { Register } from './Register'


export const LoginPage = () => {
  const [UserReg, setUserReg] = useState(0)
  const [message, setmessage] = useState(false)

  const { updateToken } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.email.value,
      password: event.target.password.value
    }
    try {
      const response = await axios.post(`${BaseUrl}auth/login`, data);

      updateToken(response.data.token);
    }
    catch (error) {
      if (error.response) {
        // The error response was received from the server
        setmessage(error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("No response received from the server");
      } else {
        // Something else went wrong
        console.log("Error:", error.message);
      }
    }
  }

  const handleRegister = () => {
    setUserReg(1)
  }

  return (
    <Container fluid className='loginBody'>
      <Row>
        <Col sm={8}>
          <div className="loginTitle">
            <h1>Rebuilt Kerala Initiative</h1>
            <h4>Local Self Government Department</h4> 
            <h6>Government of kerala</h6>
          </div>
           </Col>
        <Col className='logIn' sm={4}>
          <div >
            <form onSubmit={handleSubmit}>
              <label >e-mail</label>
              <input type="text" name='email' />
              <label>Password</label>
              <input type="password" name='password' />
              {message.password ? <small>{message.password[0]}</small> : null}
              {message.non_field_errors ? <small>{message.non_field_errors[0]}</small> : null}

              <Button type='submit'>
                Log In
              </Button>

            </form>
            <a onClick={handleRegister}>Register a new user</a>

          </div>
        </Col>
      </Row>
      <Row>
        {UserReg === 0 ? (
          <Carousel >
            <Carousel.Item>
              <img className='carImage' src="static/images/corosel1.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img className='carImage' src="static/images/corosel2.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img  className='carImage' src="images/corosel3.jpg" alt="" />
            </Carousel.Item>
          </Carousel>
        ) : <Register />}
      </Row>

    </Container>

  )
}
