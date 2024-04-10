'use client'


import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';


const EditWorkItem = () => {

    const router = useRouter();

    const [id, setId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        setId(searchParams.get('id'));
        setItemName(searchParams.get('name'));
        setItemPrice(searchParams.get('price'));

    }, [router.asPath]);


    const handleCancel = () => {

        router.push('/work-items')
        setItemName('');
        setItemPrice(0);
    };


    const updateWorkItem = async () => {


        toast.loading('Updating work item..');

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
            method: 'PUT',
            headers: myHeaders,
            body: raw,
        };

        let response = await fetch(`https://vehicle-service-management.onrender.com/item/update/id?id=${id}`, requestOptions);


        console.log(response)

        if (response.ok) {
            let res = await response.json();
            console.log(res);

            setItemName('');
            setItemPrice('');

            router.push('/work-items')

            toast.dismiss();
            toast.success('Work item updated successfully!');
        } else if (response.status === 401) {
            toast.dismiss();
            router.push('/authentication/sign-in');
            toast.error('Please log in to continue');
        } else {
            toast.dismiss();
            toast.error('Failed to update work item');
        }
    }

    const handleUpdateworkItem = (e) => {
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
            updateWorkItem();
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
                                        <Card.Title className="mb-0">Update Work Item</Card.Title>
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
                                                    <Form.Label htmlFor="price">Last Name</Form.Label>
                                                    <Form.Control type="number" id="price" name="price" placeholder="Enter item price" value={itemPrice} onChange={(e) => setItemPrice(e.target.valueAsNumber)} />
                                                </Col>
                                            </Row>

                                            <Button variant="primary" type="submit" onClick={handleUpdateworkItem}>Update Item</Button>
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

export default EditWorkItem;