import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { BaseUrl } from '../constant/BaseUrl'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

export const Project = () => {
    const [url, setUrl] = useState(`${BaseUrl}pro/project`);
    const [indexAdd, setindexAdd] = useState(1);
    const [proData, setproData] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                setproData(response.data);

            })
            .catch((error) => {
                console.log(error);
            })


    }, [url])

    const handleNext = () => {
        setUrl(proData.next);
        setindexAdd(indexAdd + 10);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For smooth scrolling animation (optional)
        });

    }
    const handlePrevious = () => {
        setUrl(proData.previous);
        setindexAdd(indexAdd - 10);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For smooth scrolling animation (optional)
        });
    }

    const handleBgColour = (index) => {
        const bgColour = [
            '#a5f25c',
            '#eaf58c',
        ]
        return bgColour[index % bgColour.length]
    }

    const checkOne = (item) => {
        navigate(`/project/${item}`); // Use /project/:id to match the route configuration
      }
      


    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={10}>
                    <div className='project-head'>
                        <h2>List of Projects Under Rebuild Kerala Intiative:LSGD </h2>

                    </div>
                    </Col>
                    <Col sm={2}>
                        <button className='btn' onClick={()=>navigate('/AddPro')}>Add New Project</button>
                    </Col>
                    <hr />
                </Row>
                <Row>
                    <div className="ProjectCount">
                        <h6>Total Projects : {proData.count}</h6>
                        <p className="item-on-right" >{indexAdd}--{indexAdd + 9}</p>
                    </div>
                </Row>
                {proData ? (proData.results.map((item, index) => (
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

                <Row>
                    <div className='pro-nav-button'>

                        {proData.previous ? <button onClick={handlePrevious} className='button pre'>Previous</button> : null}
                        {proData.next ? <button onClick={handleNext} className='button nex'>Next</button> : null}
                    </div>
                    <hr />
                </Row>

            </Container>
        </>
    )
}
