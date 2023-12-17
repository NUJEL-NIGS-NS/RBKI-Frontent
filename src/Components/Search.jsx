import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { BaseUrl } from '../constant/BaseUrl';
import SreachDisplay from './SreachDisplay';

export const Search = () => {
  const [searchData, setsearchData] = useState(null);
  const [dropLabel, setdropLabel] = useState('Category');
  const [searchList, setsearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldId, setfieldId] = useState('')
  const [showResult, setshowResult] = useState(false)
  const [propData, setpropData] = useState('')

  useEffect(() => {
    axios.get(`${BaseUrl}pro/pro-fields`)
      .then((response) => {
        console.log(response.data);
        setsearchData(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });

    // Initialize searchList as an empty array
    setsearchList([]);
  }, []);

  const filteredDistricts = searchList.filter(([district]) => {
    const districtText = String(district).toLowerCase(); // Convert to string and make it lowercase
    const searchTermText = searchTerm.toLowerCase(); // Ensure the searchTerm is lowercase
  
    return districtText.includes(searchTermText);
  });
  

  const handleLabel = (item) => {
    setdropLabel(item);
    setfieldId(searchData[item]);

    axios.get(`${BaseUrl}pro/sre-dis?field=${searchData[item]}`)
      .then((response) => {
        console.log(response.data);
        setsearchList(response.data.result_list);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  
   const handleOption = (item)=>{
    axios.get(`${BaseUrl}pro/search?field=${fieldId}&search=${item}`)
    .then((response)=>{
      setshowResult(false);
      console.log(response.data);
      setpropData(response.data);
      setshowResult(true);
    })
    .catch((error)=>{
      console.log(error);
      setshowResult(false);
    }
    )

   }
  return (
    <>
      <Container>
        <Row>
          <div className='Search-head'>
            <h1>Search And Retrieve Projects</h1>
          </div>
        </Row>
        <Row>
          <Col sm={6}>
            <h5>Select the Search category</h5>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {dropLabel}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {searchData !== null && Object.keys(searchData).map((item) => (
                  <Dropdown.Item key={item} onClick={() => handleLabel(item)}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={6}>
            {searchList.length !== 0 ? (
              <div className="search-div">
                <input className="input" placeholder="Search for a ........." onChange={(e) => setSearchTerm(e.target.value)} />
                <select size="5">
                  {filteredDistricts.length === 0 ? (
                    <option>No matching districts found</option>
                  ) : (
                    filteredDistricts.map(([district], index) => (
                      <option key={index} onClick={()=>handleOption(district)}>{district}</option>
                    ))
                  )}
                </select>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
      {showResult && <SreachDisplay proData={propData}/>}
    </>
  );
};
