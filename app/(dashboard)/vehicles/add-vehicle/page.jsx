'use client'


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { PageHeading, PageHeadingWithButton } from 'widgets'
import VehiclesNav from '../../../../components/VehiclesNav';

const AddVehicle = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        vehicleNumber: '',
        modalNumber: '',
        desctiption: '',
        dueDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };




    return (
        <Container fluid className="p-6">

            <VehiclesNav />

            <div className="py-3">
                <Row>

                    <div className='container'>

                        <Row className="justify-content-center">
                            <Col>
                                <Card>
                                    <Card.Header className="bg-primary text-white">
                                        <Card.Title className="mb-0">Add New Vehicle</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Label htmlFor="vehicleNumber">Vehicle Number</Form.Label>
                                                    <Form.Control type="text" id="vehicleNumber" name="vehicleNumber" placeholder="Enter vehicle number" value={formData.vehicleNumber} onChange={handleChange} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label htmlFor="modelNumber">Model Number</Form.Label>
                                                    <Form.Control type="text" id="modelNumber" name="modelNumber" placeholder="Enter model number" value={formData.modalNumber} onChange={handleChange} />
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Label htmlFor="description">Description</Form.Label>
                                                    <Form.Control type="text" id="description" name="description" placeholder="Enter description" value={formData.desctiption} onChange={handleChange} />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label htmlFor="dueDate">Due Date</Form.Label>
                                                    <Form.Control type="date" id="dueDate" name="dueDate" placeholder="Enter due date" value={formData.dueDate} onChange={handleChange} />
                                                </Col>
                                            </Row>
                                            <Row className="mb-4">
                                                <Col md={6}>
                                                    <Form.Label htmlFor="category">Select Owner</Form.Label>
                                                    <Form.Select id="customer" name="customer" value={formData.category} onChange={handleChange}>
                                                        <option value="">Select owner of vehicle</option>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                        {/* Add more options as needed */}
                                                    </Form.Select>
                                                </Col>
                                            </Row>

                                            <Button variant="primary" type="submit">Add Vehicle</Button>

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

export default AddVehicle;