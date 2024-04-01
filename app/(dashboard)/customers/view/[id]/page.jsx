'use client'


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { PageHeading, PageHeadingWithButton } from 'widgets'


const EditCustomer = () => {


    const router = useRouter();




    return (
        <Container fluid className="p-6">

            <Row>
                <Col lg={12} md={12} xs={12}>

                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <h3 className="mb-0 fw-bold">Customer Details</h3>
                        <Button onClick={() => router.push('/customers')} variant="primary" className="me-1">Back</Button>
                    </div>


                </Col>
            </Row>

            <div className="py-6">
                <Row>

                    <div className='container'>

                        <Row className="justify-content-center">
                            <Col>
                                <Card>
                                    <Card.Body>


                                        <Row>

                                            <Col xs={12} sm={6} className="mb-5">
                                                <h6 className="text-uppercase fs-5 ls-2">Name </h6>
                                                <p className="mb-0">Nikhil Magar</p>
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-5">
                                                <h6 className="text-uppercase fs-5 ls-2">Email </h6>
                                                <p className="mb-0">nikhil@gmail.com</p>
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-5 mb-sm-0">
                                                <h6 className="text-uppercase fs-5 ls-2">Contact Number </h6>
                                                <p className="mb-0">+91 9325849098</p>
                                            </Col>
                                            <Col xs={12} sm={6} className="">
                                                <h6 className="text-uppercase fs-5 ls-2">Address</h6>
                                                <p className="mb-0">Gaothan, Shivajinagar, Pune</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </div>

                </Row>

            </div>

        </Container>
    )
}

export default EditCustomer;