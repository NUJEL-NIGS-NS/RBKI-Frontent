import React from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import { BaseUrl } from '../constant/BaseUrl';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const UpdReview = () => {
    const [ModPro, setModPro] = useState([])
    const [type, setType] = useState('')
    const [proId, setProId] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios.get(`${BaseUrl}pro/upd-id?id=${id}`)
                .then((response) => {
                    console.log(response.data);
                    setModPro(response.data.result);
                    setType(response.data.type)
                    if (response.data.id) {
                        setProId(response.data.id)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {};
        const formElements = e.target.elements;

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name) {
                formData[element.name] = element.value;
            }
        }
        const shouldSubmit = window.confirm('Are you sure you want to Add?Update the given Data to database');
        if (shouldSubmit) {
            if (id) {
                axios.post(`${BaseUrl}pro/pmu-apl?id=${id}`, formData)
                    .then((response) => {
                        console.log(response.data);
                        alert(response.data.status);
                        if (response.data.status === 'Successfully Updated' || response.data.status === 'Successfully Inserted') {
                            navigate(-1);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            }
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModPro((prevModPro) => ({
            ...prevModPro,
            [name]: value,
        }));
    };
    const linkStyle = {
        color: 'blue',      // Set the text color to blue
        textDecoration: 'underline', // Underline the text
        cursor: 'pointer',  // Show a hand cursor on hover
    };

    const handleDecline = () => {
        axios.get(`${BaseUrl}pro/pmu-dec?id=${id}`)
            .then((response) => {
                console.log(response.data);
                alert(response.data.status);
                if (response.data.status === 'Successfully Updated' || 'Successfully Updated And Waiting for Approval') {
                    navigate(-1);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <><Container fluid>
            <form onSubmit={handleSubmit} >
                <Row>
                    <Col sm={8}>
                        <div className="project-head">
                            <h6>Project Name</h6>
                            <input type="text" name='pro_name' value={ModPro.pro_name} onChange={handleInputChange} />
                            <hr />
                        </div>
                    </Col>
                    <Col sm={4}>
                        <h4>Type : {type}</h4>
                        {type === 'Updated' ? (<a style={linkStyle} onClick={() => navigate(`/project/${proId}`)}>click button to vist project current data </a>) : null}
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={6}>
                        <div className='projectdetail'>
                            <h6>District : <input type="text" name='district' value={ModPro.district} onChange={handleInputChange} /></h6>
                            <h6>LAC : <input type='text' name='lac' value={ModPro.lac} onChange={handleInputChange} /></h6>
                            <h6>Local Body : <input type="text" name='local_bdy' value={ModPro.local_bdy} onChange={handleInputChange} /></h6>
                            <h6>Project Category : <input type="text" name='pro_cat' value={ModPro.pro_cat} onChange={handleInputChange} /></h6>
                            <h6>Stage : <input type="text" name='stage' value={ModPro.stage} onChange={handleInputChange} /></h6>
                            <h6>Starting Date : <input type="date" name='s_date' value={ModPro.s_date} onChange={handleInputChange} /></h6>
                            <h6>Completion Date : <input type="date" name='completion_date' value={ModPro.completion_date} onChange={handleInputChange} /></h6>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div>
                            <h6>Length : <input type="number" name='length_km' value={ModPro.length_km} onChange={handleInputChange} /></h6>
                            <h6>Lattitude : <input type="number" name='lat_tude' value={ModPro.lat_tude} onChange={handleInputChange} /></h6>
                            <h6>Longitude : <input type="number" name='log_tude' value={ModPro.log_tude} onChange={handleInputChange} /></h6>
                            <h6>Status : <input type="text" name='status' value={ModPro.status} onChange={handleInputChange} /></h6>
                        </div>
                    </Col>
                    <hr />
                </Row>
                <Row>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Administrative Sanction Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AS NO :</td>
                                        <td><input type="text" name='as_no' value={ModPro.as_no} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td><input type="date" name='as_date' value={ModPro.as_date} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td><input type="number" name='as_amt' value={ModPro.as_amt} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Revised Administrative Sanction Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Revised AS NO :</td>
                                        <td><input type="text" name='reas_no' value={ModPro.reas_no} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td><input type="date" name='reas_date' value={ModPro.reas_date} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td><input type="number" name='reas_amt' value={ModPro.reas_amt} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>\
                                    <tr>
                                        <th>Technical Sanction Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>TS NO :</td>
                                        <td><input type="text" name='ts_no' value={ModPro.ts_no} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td><input type="date" name='ts_date' value={ModPro.ts_date} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td><input type="number" name='ts_amt' value={ModPro.ts_amt} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Tender Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tender NO :</td>
                                        <td><input type="text" name='tender_no' value={ModPro.tender_no} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td><input type="date" name='tender_data' value={ModPro.tender_data} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td><input type="number" name='tender_amt' value={ModPro.tender_amt} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Agreement Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ag NO :</td>
                                        <td><input type="text" name='agr_no' value={ModPro.agr_no} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td><input type="date" name='agr_date' value={ModPro.agr_date} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td><input type="number" name='arg_amt' value={ModPro.arg_amt} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Handover Date</td>
                                        <td><input type="date" name='hand_to_date' value={ModPro.hand_to_date} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Period</td>
                                        <td><input type="text" name='period' value={ModPro.period} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Contractor Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td><input type="text" name='c_name' value={ModPro.c_name} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td><input type="number" name='c_phone' value={ModPro.c_phone} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>email address</td>
                                        <td><input type="email" name='c_email' value={ModPro.c_email} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>PAN NO</td>
                                        <td><input type="text" name='c_pan' value={ModPro.c_pan} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <div>
                            <Table striped="columns">
                                <thead>
                                    <tr>
                                        <th>Financial Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Utility Shifting Charges </td>
                                        <td><input type="text" name='utility' value={ModPro.utility} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Maintenance Charge</td>
                                        <td><input type="number" name='mait_charge' value={ModPro.mait_charge} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Total Expenditure</td>
                                        <td><input type="number" name='total_exp' value={ModPro.total_exp} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Financial Progress</td>
                                        <td><input type="number" name='fin_pro' value={ModPro.fin_pro} onChange={handleInputChange} />%</td>
                                    </tr>
                                    <tr>
                                        <td>Physical Progress</td>
                                        <td><input type="number" name='phy_pro' value={ModPro.phy_pro} onChange={handleInputChange} />%</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='Update-Details'>
                        <p>Update by : <input type="text" name='updated_by' value={ModPro.updated_by} onChange={handleInputChange} /></p>

                    </div>
                </Row>
                <Row>
                    <div className='search-div'>
                        <button type='submit' className="btn">Approve data</button>
                    </div></Row>
            </form>
            <button className="btn" onClick={handleDecline}>Decline data</button>
        </Container></>
    )
}

export default UpdReview