import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { BaseUrl } from '../constant/BaseUrl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UpdatePMU = () => {
  const navigate = useNavigate();
  const [indexAdd, setindexAdd] = useState(1);
  const [proData, setproData] = useState(false);
  useEffect(() => {
    axios.get(`${BaseUrl}pro/upd-pro`)
      .then((response) => {
        console.log(response.data);
        setproData(response.data.projects);

      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  const handleBgColour = (index) => {
    const bgColour = [
      '#f79299',
      '#faed78',
    ]
    return bgColour[index % bgColour.length]
  }
  const checkOne = (item) => {
    alert(item)
    navigate(`/UpdPro/${item}`); // Use /project/:id to match the route configuration
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={10}>
            <div className='project-head'>
              <h2>List of Projects Updated and Pending for Approval </h2>

            </div>
          </Col>
          <Col sm={2}>
            <button className='btn' onClick={() => navigate('*')}>Add New Project</button>
          </Col>
          <hr />
        </Row>
        <Row>
          <div className="ProjectCount">
            <h6>Total Projects : {proData.length}</h6>
            <p className="item-on-right" >{indexAdd}--{proData.length}</p>
          </div>
        </Row>
        {proData ? (proData.map((item, index) => (
          <Row className='project-display' key={index} style={{ background: handleBgColour(index) }} >

            <Col sm={6} onClick={() => checkOne(item.id)}>
              Index : {index + indexAdd}<br />
              Administrative  Saction No : {item.as_no}<br />
              Project Name :{item.pro_name}<br />
              District :{item.district} <br />
              Length (Km):|{item.length_km}
            </Col>
            <Col sm={6}>
              Category : {item.pro_cat} <br />
              Current Status of Work: {item.stage}<br />
              Physical Progress :<ProgressBar animated now={item.phy_pro} label={`${item.phy_pro}%`} />
              Financial Progree :<ProgressBar animated now={item.fin_pro} label={`${item.fin_pro}%`} />
            </Col>

          </Row>
        ))
        ) : null}



      </Container>
    </>
  )
}
