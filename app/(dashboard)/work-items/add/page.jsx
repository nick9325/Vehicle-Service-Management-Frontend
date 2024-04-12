'use client'


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';


const AddWorkItem = () => {

    const router = useRouter();


    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);




    const handleCancel = () => {

        router.push('/work-items')
        setItemName('');
        setItemPrice(0);
    };


    const addworkItem = async () => {


        toast.loading('Adding work item..');

        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        var raw = JSON.stringify({
            "name": itemName,
            "price": itemPrice,
        });
        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(`https://vehicle-service-management.onrender.com/item/add`, requestOptions);


        console.log(response)

        if (response.ok) {
            let res = await response.json();
            console.log(res);

            setItemName('');
            setItemPrice('');

            router.push('/work-items')

            toast.dismiss();
            toast.success('Work item added successfully!');
        } else if (response.status === 401) {
            toast.dismiss();
            router.push('/authentication/sign-in');
            toast.error('Please log in to continue');
        } else {
            toast.dismiss();
            toast.error('Failed to add work item');
        }
    }

    const handleAddworkItem = (e) => {
        e.preventDefault();

        if (itemName === "") {
            toast.dismiss()
            toast.error("Please enter item name")
        }
        else if (itemPrice === "") {
            toast.dismiss()
            toast.error("Please enter item price")
        }
        else {
            addworkItem();
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
                                        <Card.Title className="mb-0">Work item Registration</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row >
                                                <Col className="mb-3">
                                                    <Form.Label htmlFor="name">Item Name</Form.Label>
                                                    <Form.Control type="text" id="name" name="name" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="mb-3">
                                                    <Form.Label htmlFor="price">Item Price</Form.Label>
                                                    <Form.Control type="number" id="price" name="price" placeholder="Enter item price" value={itemPrice} onChange={(e) => setItemPrice(e.target.valueAsNumber)} />
                                                </Col>
                                            </Row>

                                            <Button variant="primary" type="submit" onClick={handleAddworkItem}>Add Item</Button>
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

export default AddWorkItem;