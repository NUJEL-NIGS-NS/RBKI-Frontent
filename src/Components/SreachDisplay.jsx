import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'


const SreachDisplay = ({proData}) => {
  
  const navigate = useNavigate();
  const [indexAdd, setindexAdd] = useState(1)
  const handleBgColour = (index) => {
    const bgColour = [
        '#b6f2ec',
        '#b4e3b1',
    ]
    return bgColour[index % bgColour.length]
}

const checkOne =(item)=>{
  navigate(`/project/${item}`);
}
  return (
    <>
      <Container fluid>
        <Row>
          <div className='project-head'>
            <h2> Search Result </h2>

          </div>
          <hr />
        </Row>
        
        {proData ? (proData.results.map((item, index) => (
                    <Row className='project-display' key={index} style={{ background: handleBgColour(index) }} >

                        <Col sm={6}  onClick={() => checkOne(item.id)}>
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

export default SreachDisplay