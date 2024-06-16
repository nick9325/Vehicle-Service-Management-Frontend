'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Table, Button, Modal, Card, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';



const ServiceAdvisors = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [serviceAdvisorsData, setServiceAdvisorsData] = useState([]);
    const [selectedserviceAdvisor, setSelectedserviceAdvisor] = useState(null);
    const [deletingserviceAdvisor, setDeletingserviceAdvisor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)


    const handleClose = () => setShow(false);
    const handleShow = (serviceAdvisor) => {
        setSelectedserviceAdvisor(serviceAdvisor);
        setShow(true);
    };

    const handleDelete = async () => {
        setShow(false);
        if (deletingserviceAdvisor) {
            toast.loading('Deleting service advisor..')
            const token = localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };

            try {
                const response = await fetch(`https://vehicle-service-management.azurewebsites.net/user/delete?id=${deletingserviceAdvisor.id}`, requestOptions);
                if (response.ok) {
                    toast.dismiss();
                    toast.success('Service advisor deleted successfully!');
                    fetchServiceAdvisors();


                } else {
                    toast.dismiss();
                    toast.error('Failed to delete service advisor');
                }
            } catch (error) {
                console.error('Error occurred while deleting service advisor:', error);
                toast.error('An error occurred while deleting service advisor');
            }
        }
    };



    const fetchServiceAdvisors = async () => {


        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);


        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(`http://localhost:8082/user/get/all/serviceAdvisor`, requestOptions);
            if (response.ok) {
                const serviceAdvisors = await response.json();
                setServiceAdvisorsData(serviceAdvisors);
                setLoading(false);
            } else if (response.status === 401) {
                toast.dismiss();
                toast.error('Please log in to continue');
                setLoading(false);
                router.push('/authentication/sign-in');
            } else {
                setLoading(false);
                toast.dismiss();
                toast.error('Failed to fetch service advisors');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error occurred while fetching service advisors:', error);
            toast.dismiss();
            toast.error('An error occurred while fetching service advisors');
        }
    };

    useEffect(() => {
        fetchServiceAdvisors();
    }, []);

    const filteredserviceAdvisors = serviceAdvisorsData.filter(
        (serviceAdvisor) =>
            serviceAdvisor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            serviceAdvisor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            serviceAdvisor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageSize = 5;
    const totalItems = filteredserviceAdvisors.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const currentItems = filteredserviceAdvisors.slice(startIndex, endIndex + 1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <Container fluid className="p-6">

            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <h3 className="mb-0 fw-bold">Service Advisors</h3>
                        <Button onClick={() => router.push('/service-advisors/add')} variant="primary" className="">
                            Add New Service Advisor
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <Form.Group controlId="formBasicSearch">
                        <Form.Control
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="py-6">
                <Row>
                    <div className={`container ${!loading?'overflow-x-auto':''} `}>

                        {!loading ?

                            <Table className="text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {currentItems.map((serviceAdvisor, index) => (
                                        <tr key={startIndex + index + 1}>
                                            <Modal show={show && selectedserviceAdvisor === serviceAdvisor} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Deletion</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete {serviceAdvisor.firstName} {serviceAdvisor.lastName}?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="danger" onClick={handleDelete}>
                                                        Delete
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <th scope="row">{startIndex + index + 1}</th>
                                            <td>
                                                {serviceAdvisor.firstName} {serviceAdvisor.lastName}
                                            </td>
                                            <td>{serviceAdvisor.email}</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `/service-advisors/view?firstName=${serviceAdvisor.firstName}&lastName=${serviceAdvisor.lastName}&email=${serviceAdvisor.email}&phone=${serviceAdvisor.phone}&address=${serviceAdvisor.address}`
                                                        )
                                                    }
                                                    variant="secondary"
                                                    size="sm"
                                                    className="me-2"
                                                >
                                                    <i className="fe fe-eye"></i>
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `/service-advisors/edit?id=${serviceAdvisor.id}&firstName=${serviceAdvisor.firstName}&lastName=${serviceAdvisor.lastName}&email=${serviceAdvisor.email}&phone=${serviceAdvisor.phone}&address=${serviceAdvisor.address}`
                                                        )
                                                    }
                                                    variant="success"
                                                    size="sm"
                                                    className="me-2"
                                                >
                                                    <i className="fe fe-edit"></i>
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleShow(serviceAdvisor);
                                                        setDeletingserviceAdvisor(serviceAdvisor);
                                                    }}
                                                    variant="danger"
                                                    size="sm"
                                                    className=""
                                                >
                                                    <i className="fe fe-trash-2"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> : <div className='text-center'><Spinner animation="border" />
                            </div>}
                    </div>
                </Row>
                {totalPages > 1 && (
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            {currentPage > 1 && (
                                <Button onClick={handlePrevPage} className="me-2">
                                    Prev
                                </Button>
                            )}
                            {currentPage < totalPages && (
                                <Button onClick={handleNextPage}>Next</Button>
                            )}
                        </Col>
                    </Row>
                )}
            </div>
        </Container>
    );
};

export default ServiceAdvisors;
