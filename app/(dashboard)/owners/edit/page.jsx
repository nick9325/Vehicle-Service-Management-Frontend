'use client'


import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';



const EditOwner = () => {


    const router = useRouter();



    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFormData({
            id: searchParams.get('id'),
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
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        });
    };


    const updateOwner = async () => {

        toast.loading('Updating owner..');

        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        var raw = JSON.stringify({
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "phone": formData.phone,
            "address": formData.address,
            "email": formData.email,
        });
        console.log(raw)

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(`https://vehicle-service-management.onrender.com/owner/${formData.id}/update`, requestOptions);


        console.log(response)

        if (response.ok) {
            let res = await response.json();
            console.log(res);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contact: '',
                address: '',
            });

            router.push('/owners')

            toast.dismiss();
            toast.success('Owner updated successfully!');
        } else if (response.status === 403) {
            toast.dismiss();
            router.push('/authentication/sign-in');
            toast.error('Please log in to continue');
        } else {
            toast.dismiss();
            toast.error('Failed to update owner');
        }
    }


    const handleSaveChanges = (e) => {
        e.preventDefault();

        if (formData.firstName === "") {
            toast.dismiss()
            toast.error("Please enter firstname")
        }
        else if (formData.lastName === "") {
            toast.dismiss()
            toast.error("Please enter lastname")
        }
        else if (formData.contact === "") {
            toast.dismiss()
            toast.error("Please enter phone")
        }
        else if (formData.address === "") {
            toast.dismiss()
            toast.error("Please enter address")
        }
        else if (formData.email === "") {
            toast.dismiss()
            toast.error("Please enter email")
        }
        else {
            updateOwner();
        }

    }


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
                                                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                                    <Form.Control type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                                                </Col>

                                            </Row>
                                            <Row >
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="phone">Phone</Form.Label>
                                                    <Form.Control type="text" id="phone" name="phone" placeholder="Enter your contact number" value={formData.phone} onChange={handleChange} />
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
                                            <Button variant="primary" type="submit" onClick={handleSaveChanges}>Save Changes</Button>
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