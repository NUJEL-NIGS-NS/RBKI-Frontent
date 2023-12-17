import React, { useEffect, useState } from 'react'
import '../../CSS/TopCard.css'
import axios from 'axios'
import { BaseUrl } from '../../constant/BaseUrl'
import { Container, Row, Col } from 'react-bootstrap'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const TopCard = () => {

    const [dashData, setdashData] = useState(false);
    const [options, setoptions] = useState(null);
    const [options2, setoptions2] = useState(null);

    useEffect(() => {
        axios.get(`${BaseUrl}pro/dash`)
            .then((response) => {
                console.log(response.data);
                setdashData(response.data);
                const chartOptions = {
                    title: {
                        text: "Work Overview",
                        horizontalAlign: "left",
                        fontSize: 20,
                        margin: 25,
                        padding: 4,
                    },
                    axisY: {
                        lineThickness: 0,
                        gridThickness: 0,
                        tickLength: 0
                    },

                    data: [
                        {
                            type: "column",

                            dataPoints: response.data.district_wise.map((item, index) => ({
                                label: item.district,
                                y: item.total,

                            })),
                        },
                    ],
                    axisYType: "secondary",
                    stripLines: [],
                };
                const chartPie = {
                    animationEnabled: true,
                    title: {
                        text: "Project Stages",
                        horizontalAlign: "left",
                        fontSize: 20,
                        margin: 25,
                        padding: 4,
                    },
                    
                    data: [{
                        type: "doughnut",
                        showInLegend: true,
                        indexLabel: "{name}: {y}",
                        yValueFormatString: "#,###'%'",
                        dataPoints: [
                            { name: "Total Projects", y: response.data.count },
                            { name: "Completed Projects", y: response.data.workCmp },

                        ]
                    }]
                }
                setoptions(chartOptions);
                setoptions2(chartPie)


            })
            .catch(
                (error) => {
                    console.log(error)
                }
            )


    }, [])





    const getGradient = (index) => {
        const gradients = [
            'linear-gradient(82.59deg, #00c48c 0%, #00a173 100%)',
            'linear-gradient(81.67deg, #0084f4 0%, #1a4da2 100%)',
            'linear-gradient(69.83deg, #0084f4 0%, #00c48c 100%)',
            'linear-gradient(81.67deg, #ff647c 0%, #1f5dc5 100%)',
            'linear-gradient(16deg, rgba(255,0,239,1) 7%, rgba(113,0,226,1) 49%, rgba(60,0,255,1) 100%)',
            'linear-gradient(to bottom right, green, yellow)'
        ];

        return gradients[index % gradients.length];
    };

    return (
        <>
            {dashData ? (

                <div id="root">
                    <div className="container pt-5">
                        <div className="row align-items-stretch">
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                        AS AWARDED

                                    </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count">
                                        ₹{dashData.as_awarded}
                                    </span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                        ALLOCATION FROM RKI

                                    </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count">
                                        ₹{dashData.all_RKI}

                                    </span>

                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                        WORK EXPENDITURE

                                    </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count">
                                        ₹{dashData.wrk_exp}
                                    </span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                        TOTAL EXPENDITURE

                                    </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count">

                                    </span>
                                </div>
                            </div>
                            {dashData.status ? (
                                dashData.status.map((item, index) => (
                                    <div className="c-dashboardInfo col-lg-3 col-md-6" key={index}>
                                        <div className="wrap" style={{ background: getGradient(index) }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight dashloop ">
                                                {item.stage}
                                            </h4>
                                            <span className="hind-font caption-12 c-dashboardInfo__count">
                                                {item.total}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}

                            {dashData.procat ? (
                                dashData.procat.map((item, index) => (
                                    <div className="c-dashboardInfo col-lg-3 col-md-6" key={index}>
                                        <div className="wrap" style={{ background: getGradient(index) }}>
                                            <h4 className="heading heading5 hind-font medium-font-weight dashloop ">
                                                {item.pro_cat}
                                            </h4>
                                            <span className="hind-font caption-12 c-dashboardInfo__count">
                                                {item.total}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}

                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap" style={{ background: getGradient(5) }}>
                                    <h4 className="heading heading5 hind-font medium-font-weight dashloop ">
                                        Total Project
                                    </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count">
                                        {dashData.count}
                                    </span>
                                </div>
                            </div>

                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap" style={{ background: getGradient(4) }}>
                                    <h4 className="heading heading5 hind-font medium-font-weight dashloop ">
                                        Km Compeleted / Total Km
                                    </h4>
                                    <span className="hind-font caption-12 dashkilometer">
                                        {dashData.length_cmp}/{dashData.length_pro}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>







            ) : <p>loading</p>}
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        <div>

                            {dashData.district_wise ? <CanvasJSChart options={options} /> : null}
                        </div>

                    </Col>
                    <Col sm={4}>
                        {dashData ? <CanvasJSChart options={options2}
                        /* onRef={ref => this.chart = ref} */
                        /> : null}
                    </Col>
                </Row>

            </Container>


        </>
    )
}
