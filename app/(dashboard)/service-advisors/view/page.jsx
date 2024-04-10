"use client"

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const ViewServiceAdvisor = () => {

    const router = useRouter();
    
    const [serviceAdvisorDetails, setserviceAdvisorDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setserviceAdvisorDetails({
            firstName: searchParams.get('firstName'),
            lastName: searchParams.get('lastName'),
            email: searchParams.get('email'),
            phone: searchParams.get('phone'),
            address: searchParams.get('address')
        });
    }, [router.asPath]);

    return (
        <Container fluid className="p-6">
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <h3 className="mb-0 fw-bold">serviceAdvisor Details</h3>
                        <Button onClick={() => router.push('/service-advisors')} variant="primary" className="me-1">Back</Button>
                    </div>
                </Col>
            </Row>
            <div className="py-6">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} sm={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Name </h6>
                                        <p className="mb-0">{serviceAdvisorDetails.firstName} {serviceAdvisorDetails.lastName}</p>
                                    </Col>
                                    <Col xs={12} sm={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Email </h6>
                                        <p className="mb-0">{serviceAdvisorDetails.email}</p>
                                    </Col>
                                    <Col xs={12} sm={6} className="mb-5 mb-sm-0">
                                        <h6 className="text-uppercase fs-5 ls-2">Contact Number </h6>
                                        <p className="mb-0">{serviceAdvisorDetails.phone}</p>
                                    </Col>
                                    <Col xs={12} sm={6} className="">
                                        <h6 className="text-uppercase fs-5 ls-2">Address</h6>
                                        <p className="mb-0">{serviceAdvisorDetails.address}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ViewServiceAdvisor;
