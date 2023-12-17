import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table,Button } from 'react-bootstrap';
import { BaseUrl } from '../constant/BaseUrl'
import { useParams, useNavigate } from 'react-router-dom'

export const ProDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setproject] = useState(false)
  useEffect(() => {
    axios.get(`${BaseUrl}pro/pro-detail?id=${id}`)
      .then((response) => {
        setproject(response.data.result);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })


  }, [id])

  const handleEdit = (item) => {
  navigate(`/AddPro/${item}`)
  }
  const handleDelete = (item) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this Project data?');
    if (shouldDelete) {
      axios.get(`${BaseUrl}pro/delete?id=${item}`)
    .then((response)=>{
      console.log(response.data);
      alert(response.data.status);
      navigate('/Projects')
    })
    .catch((error)=>{
      console.log(error)
    })
      
    }
  }

  return (
    <>
      {project ? (
        <Container fluid>
          <Row>
            <Col sm={10}>
            <div className="project-head">
              <h2>{project.pro_name}</h2>
            </div>
            </Col>
            <Col sm={2}>
              <div>
                <button className='btn' onClick={()=>handleEdit(id)}>Edit</button>
                <span></span>
                <button className='btn' onClick={()=>handleDelete(id)}>Delete</button>
              </div>
            </Col>
              <hr />
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <div className='projectdetail'>
                <h6>District : {project.district}</h6>
                <h6>LAC : {project.lac}</h6>
                <h6>Local Body : {project.local_bdy}</h6>
                <h6>Project Category : {project.pro_cat}</h6>
                <h6>Stage : {project.stage}</h6>
                <h6>Starting Date : {project.s_date}</h6>
                <h6>Completion Date : {project.completion_date}</h6>
              </div>
            </Col>
            <Col sm={6}>
              <div>
                <h6>Length : {project.length_km}</h6>
                <h6>Lattitude : {project.lat_tude}</h6>
                <h6>Longitude : {project.log_tude}</h6>
                <h6>Status : {project.status}</h6>
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
                      <td>{project.as_no}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{project.as_date}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{project.as_amt}</td>
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
                      <td>{project.reas_no}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{project.reas_date}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{project.reas_amt}</td>
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
                      <th>Technical Sanction Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TS NO :</td>
                      <td>{project.ts_no}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{project.ts_date}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{project.ts_amt}</td>
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
                      <td>{project.tender_no}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{project.tender_data}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{project.tender_amt}</td>
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
                      <td>{project.agr_no}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{project.agr_date}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{project.arg_amt}</td>
                    </tr>
                    <tr>
                      <td>Handover Date</td>
                      <td>{project.hand_to_date}</td>
                    </tr>
                    <tr>
                      <td>Period</td>
                      <td>{project.period}</td>
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
                      <td>{project.c_name}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{project.c_phone}</td>
                    </tr>
                    <tr>
                      <td>email address</td>
                      <td>{project.c_email}</td>
                    </tr>
                    <tr>
                      <td>PAN NO</td>
                      <td>{project.c_pan}</td>
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
                      <td>{project.utility}</td>
                    </tr>
                    <tr>
                      <td>Maintenance Charge</td>
                      <td>{project.mait_charge}</td>
                    </tr>
                    <tr>
                      <td>Total Expenditure</td>
                      <td>{project.total_exp}</td>
                    </tr>
                    <tr>
                      <td>Financial Progress</td>
                      <td>{project.fin_pro +"%"}</td>
                    </tr>
                    <tr>
                      <td>Physical Progress</td>
                      <td>{project.phy_pro +"%"}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row>
            <Button onClick={()=>navigate(`/ImgGal/${id}`)}>Take to Project Media files</Button>
            <div className='Update-Details'>
              <p>Update by {project.updated_by}</p>
              <p>last update {Date(project.last_upd)}</p>
            </div>
          </Row>
        </Container>
      ) : null}
    </>
  )
}
