'use client'


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { PageHeading, PageHeadingWithButton } from 'widgets'


const EditCustomer = () => {


    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: 'nikhil',
        email: 'nikhil@gmail.com',
        contact: '9325849098',
        address: 'Shivajinagar, Gaothan, Pune',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {

        router.push('/customers')

        setFormData({
            fullName: '',
            email: '',
            contact: '',
            address: '',
        });
    };



    return (
        <Container fluid className="p-6">

            <PageHeading heading="Edit Customer" />

            <div className="py-6">
                <Row>

                    <div className='container'>

                        <Row className="justify-content-center">
                            <Col>
                                <Card>
                                    <Card.Header className="bg-primary text-white">
                                        <Card.Title className="mb-0">Editing...</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Label htmlFor="fullName">Full Name</Form.Label>
                                                    <Form.Control type="text" id="fullName" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label htmlFor="email">Email address</Form.Label>
                                                    <Form.Control type="email" id="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                            <Col md={6}>
                                                <Form.Label htmlFor="contact">Contact Number</Form.Label>
                                                <Form.Control type="text" id="contact" name="contact" placeholder="Enter your contact number" value={formData.contact} onChange={handleChange} />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label htmlFor="address">Address</Form.Label>
                                                <Form.Control type="text" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} />
                                            </Col>
                                        </Row>
                                            <Button variant="primary" type="submit">Save Changes</Button>
                                            <Button variant="secondary" className="ms-2" onClick={handleCancel}>Cancel</Button>
                                        </Form>
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