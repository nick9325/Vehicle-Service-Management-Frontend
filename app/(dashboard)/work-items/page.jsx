'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Table, ButtonGroup, Button, Modal, Card, Form } from 'react-bootstrap';
import { PageHeading, PageHeadingWithButton } from 'widgets';
import { GetAllWorkItems } from '../../../constants/WorkItemEndpoints'
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';

const WorkItems = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [workItemsData, setWorkItemsData] = useState([]);
    const [selectedworkItem, setSelectedworkItem] = useState(null);
    const [deletingworkItem, setDeletingworkItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = (workItem) => {
        setSelectedworkItem(workItem);
        setShow(true);
    };

    const handleDelete = async () => {
        setShow(false);
        if (deletingworkItem) {
            const token = localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };

            try {
                const response = await fetch(`https://vehicle-service-management.onrender.com/item/delete/id?id=${deletingworkItem.id}`, requestOptions);
                if (response.ok) {
                    toast.dismiss();
                    toast.success('Work item deleted successfully!');
                    fetchItems();
                } else {
                    toast.dismiss();
                    toast.error('Failed to delete work item');
                }
            } catch (error) {
                console.error('Error occurred while deleting work item:', error);
                toast.error('An error occurred while deleting work item');
            }
        }
    };

    const fetchItems = async () => {

        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        try {
            const response = await fetch(`https://vehicle-service-management.onrender.com/item/get/all`, requestOptions);
            if (response.ok) {
                const workItems = await response.json();
                setWorkItemsData(workItems);
                setLoading(false);
            } else if (response.status === 403) {
                toast.dismiss();
                toast.error('Please log in to continue');
                router.push('/authentication/sign-in');
            } else {
                toast.dismiss();
                toast.error('Failed to fetch work items');
            }
        } catch (error) {
            console.error('Error occurred while fetching work items:', error);
            toast.dismiss();
            toast.error('An error occurred while fetching work items');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const filteredworkItems = workItemsData.filter(
        (workItem) =>
            workItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageSize = 5;
    const totalItems = filteredworkItems.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const currentItems = filteredworkItems.slice(startIndex, endIndex + 1);

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
                        <h3 className="mb-0 fw-bold">workItems</h3>
                        <Button onClick={() => router.push('/work-items/add')} variant="primary" className="">
                            Add New workItem
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <Form.Group controlId="formBasicSearch">
                        <Form.Control
                            type="text"
                            placeholder="Search work item.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="py-6">
                <Row>
                    <div className={`container ${!loading ? 'overflow-x-auto' : ''} `}>

                        {!loading ?
                            <Table className="text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Cost(₹)</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((workItem, index) => (
                                        <tr key={startIndex + index + 1}>
                                            <Modal show={show && selectedworkItem === workItem} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Deletion</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete {workItem.name}?
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
                                                {workItem.name}
                                            </td>
                                            <td>{workItem.price}</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `/work-items/edit?id=${workItem.id}&name=${workItem.name}&price=${workItem.price}`
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
                                                        handleShow(workItem);
                                                        setDeletingworkItem(workItem);
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
                            </Table>:<div className='text-center'><Spinner animation="border" />
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

export default WorkItems;
