'use client'


import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';



const EditOwner = () => {


    const router = useRouter();



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFormData({
            firstName: searchParams.get('firstName'),
            lastName: searchParams.get('lastName'),
            email: searchParams.get('email'),
            phone: searchParams.get('phone'),
            address: searchParams.get('address')
        });
    }, [router.asPath]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {

        router.push('/owners')

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        });
    };








    return (
        <Container fluid className="p-6">



            <div className="py-6">
                <Row>

                    <div className='container'>

                        <Row className="justify-content-center">
                            <Col>
                                <Card>
                                    <Card.Header className="bg-primary text-white">
                                        <Card.Title className="mb-0">Edit Owner</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row >
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                                                    <Form.Control type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="fullName">Last Name</Form.Label>
                                                    <Form.Control type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                                                </Col>

                                            </Row>
                                            <Row >
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="contact">Phone</Form.Label>
                                                    <Form.Control type="text" id="contact" name="contact" placeholder="Enter your contact number" value={formData.phone} onChange={handleChange} />
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="email">Email</Form.Label>
                                                    <Form.Control type="email" id="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md={12} className="mb-3">
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

export default EditOwner;