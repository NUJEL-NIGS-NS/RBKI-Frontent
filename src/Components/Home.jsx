import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../constant/AppContext';
import { BaseUrl } from '../constant/BaseUrl';
import { TopCard } from './DashComponents/TopCard';
import { Routes, Route ,useNavigate} from 'react-router-dom';
import { Project } from './Project'
import { Search } from './Search';
import { ProDisplay } from './ProDisplay';
import { AddProject } from './AddProject';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { UpdatePMU } from './UpdatePMU';
import UpdReview from './UpdReview';
import { ImageGal } from './ImageGal';



export const Home = () => {
  const [userDetail, setuserDetail] = useState(false);
  const { Token, updateToken } = useContext(AuthContext);
  const [updCount, setupdCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Token ${Token}`;
    axios.get(`${BaseUrl}auth/user`)
      .then((response) => {
        console.log(response.data);
        setuserDetail(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get(`${BaseUrl}pro/dep-upd`)
      .then((response) => {
        setupdCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  const handleLogout = () => {
    updateToken(null);
    localStorage.removeItem('token');

  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <img src='images/logo.jpg' alt='..' className="img-fluid main-logo" />
          <Navbar.Brand href="/">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Projects">Projects</Nav.Link>
              
              <Nav.Link href="#search">Search</Nav.Link>

            </Nav>
            <Nav>
              <Nav.Link>
                {userDetail.department === 'PMU' ? (

                  <Button variant="primary" onClick={()=>navigate('Upd-Pmu')} >
                    PMU <Badge bg="secondary">{updCount}</Badge>
                    <span className="visually-hidden">unread messages</span>
                  </Button>

                ) : userDetail.department !== 'PMU' ? userDetail.department : null}
              </Nav.Link>
              <Nav.Link eventKey={2} >
                {userDetail.username ? <>{userDetail.username} <img src='images/userlogo.png' alt='..' className="img-fluid user-logo" />  </> : 'loading '}
                <img src='images/power.png' alt='..' className="img-fluid user-logo" onClick={handleLogout} />

              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<TopCard />} />
        <Route path='Projects' element={<Project />} />
        <Route path='Search' element={<Search />} />
        <Route path="/project/:id" element={<ProDisplay />} />
        <Route path='/AddPro/:id?' element={<AddProject />} />
        <Route path='*' element={<><h1>no page</h1></>} />
        <Route path='Upd-Pmu' element={<UpdatePMU />} />
        <Route path='/UpdPro/:id?' element={<UpdReview/>} />
        <Route path='/ImgGal/:id?' element={<ImageGal/>} />

      </Routes>
    </>
  )
}
