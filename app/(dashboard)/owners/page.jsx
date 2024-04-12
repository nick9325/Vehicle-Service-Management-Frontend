'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Table, ButtonGroup, Button, Modal, Card, Form } from 'react-bootstrap';
import { DeleteOwnerById, GetAllOwners } from '../../../constants/OwnerEndpoints';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';


const Owners = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [ownersData, setOwnersData] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [deletingOwner, setDeletingOwner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = (owner) => {
        setSelectedOwner(owner);
        setShow(true);
    };

    const handleDelete = async () => {
        setShow(false);
        if (deletingOwner) {
            const token = localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
            };

            try {
                const response = await fetch(`${DeleteOwnerById}${deletingOwner.id}`, requestOptions);
                if (response.ok) {
                    toast.dismiss();
                    toast.success('Owner deleted successfully!');
                    fetchOwners();
                } else {
                    toast.dismiss();
                    toast.error('Failed to delete owner');
                }
            } catch (error) {
                console.error('Error occurred while deleting owner:', error);
                toast.error('An error occurred while deleting owner');
            }
        }
    };

    const fetchOwners = async () => {

        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        try {
            const response = await fetch(`${GetAllOwners}`, requestOptions);
            if (response.ok) {
                const owners = await response.json();
                setOwnersData(owners);
                setLoading(false);
            } else if (response.status === 401) {
                setLoading(false);
                toast.dismiss();
                toast.error('Please log in to continue');
                router.push('/authentication/sign-in');
            } else {
                toast.dismiss();
                toast.error('Failed to fetch owners');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error occurred while fetching owners:', error);
            toast.dismiss();
            toast.error('An error occurred while fetching owners');
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const filteredOwners = ownersData.filter(
        (owner) =>
            owner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageSize = 5;
    const totalItems = filteredOwners.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const currentItems = filteredOwners.slice(startIndex, endIndex + 1);

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
                        <h3 className="mb-0 fw-bold">Owners</h3>
                        <Button onClick={() => router.push('/owners/add')} variant="primary" className="">
                            Add New Owner
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
                    <div className={`container ${!loading ? 'overflow-x-auto' : ''} `}>

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
                                    {currentItems.map((owner, index) => (
                                        <tr key={startIndex + index + 1}>
                                            <Modal show={show && selectedOwner === owner} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm Deletion</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to delete {owner.firstName} {owner.lastName}?
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
                                                {owner.firstName} {owner.lastName}
                                            </td>
                                            <td>{owner.email}</td>
                                            <td>
                                                <Button
                                                    onClick={() =>
                                                        router.push(
                                                            `/owners/view?firstName=${owner.firstName}&lastName=${owner.lastName}&email=${owner.email}&phone=${owner.phone}&address=${owner.address}`
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
                                                            `/owners/edit?id=${owner.id}&firstName=${owner.firstName}&lastName=${owner.lastName}&email=${owner.email}&phone=${owner.phone}&address=${owner.address}`
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
                                                        handleShow(owner);
                                                        setDeletingOwner(owner);
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

export default Owners;
