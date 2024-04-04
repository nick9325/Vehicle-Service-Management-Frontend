'use client'


import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Col, Row, Container, Table, ButtonGroup, Button, Modal, Card } from 'react-bootstrap';
import { PageHeading, PageHeadingWithButton } from 'widgets'


const Customers = () => {

    const customerId = '9485894359ir948';
    const router = useRouter();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        setShow(false);
    };


    return (
        <Container fluid className="p-6">

            <Row>
                <Col lg={12} md={12} xs={12}>

                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <h3 className="mb-0 fw-bold">Customers</h3>
                        <Button onClick={() => router.push('/customers/add')} variant="primary" className="me-1">Add New Customer</Button>
                    </div>

                </Col>
            </Row>

            <div className="py-6">
                <Row>

                    <div className='container overflow-x-auto'>


                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Deletion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete customer_name?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Table className="text-nowrap">
                            <thead >
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Prasad Hiwarkar</td>
                                    <td>prasad@gmail.com</td>
                                    <td>
                                        <Button onClick={() => router.push('/customers/view/' + customerId)} variant="secondary" size='sm' className="me-2"><i className="fe fe-eye"></i></Button>

                                        <Button onClick={() => router.push('/customers/edit/' + customerId)} variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>

                                        <Button onClick={handleShow} variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                    </td>

                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Vaibhavi Hule</td>
                                    <td>vaibhavi@gmail.com</td>
                                    <td>
                                        <Button onClick={() => router.push('/customers/view/' + customerId)} variant="secondary" size='sm' className="me-2"><i className="fe fe-eye"></i></Button>

                                        <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>

                                        <Button onClick={handleShow} variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Nikhil Magar</td>
                                    <td>nikhil@gmail.com</td>
                                    <td>
                                        <Button onClick={() => router.push('/customers/view/' + customerId)} variant="secondary" size='sm' className="me-2"><i className="fe fe-eye"></i></Button>
                                        <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>

                                        <Button onClick={handleShow} variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>


                        {/* <Card className="contact-card" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title className="contact-name">Nikhil Magar</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">nikhildmagar@gmail.com</Card.Subtitle>
                                <Card.Text><strong>Contact Number:</strong> 9325849098</Card.Text>
                                <Card.Text><strong>Address:</strong> shivajinagar, pune</Card.Text>
                                <Button className="mr-2" variant="info" onClick={() => onUpdate(contact)}>Update</Button>
                                <Button variant="danger" onClick={() => onDelete(contact)}>Delete</Button>
                            </Card.Body>
                        </Card> */}


                    </div>

                </Row>

            </div>

        </Container>
    )
}

export default Customers;