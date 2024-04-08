'use client'


import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Table, ButtonGroup, Button, Modal, Card } from 'react-bootstrap';
import { PageHeading, PageHeadingWithButton } from 'widgets'
import { GetAllOwners } from '../../../constants/OwnerEndpoints';
import toast from 'react-hot-toast'


const Onwers = () => {

    const router = useRouter();
    const [show, setShow] = useState(false);
    const [ownersData, setOwnersData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        setShow(false);
    };


    const fetchOwners = async () => {

        toast.dismiss();
        toast.loading("Fetching owners..");

        const token = localStorage.getItem('token');
        console.log(token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };


        let response = await fetch(`${GetAllOwners}`, requestOptions);


        if (response.ok) {
            let res = await response.json();
            setOwnersData(res);

            toast.dismiss();
            toast.success('Vehicles fetched successfully!');

        } else if (response.status === 403) {
            toast.dismiss();
            toast.error('Please log in to continue');
            router.push('/authentication/sign-in');
            alert('token expired!');
        } else {
            toast.dismiss();
            toast.error('Failed to fetch vehicles');
        }

    }


    useEffect(() => {
        fetchOwners();
    }, [])


    return (
        <Container fluid className="p-6">

            <Row>
                <Col lg={12} md={12} xs={12}>

                    <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
                        <h3 className="mb-0 fw-bold">Owners</h3>
                        <Button onClick={() => router.push('/owners/add')} variant="primary" className="">Add New Onwer</Button>
                    </div>

                </Col>
            </Row>

            <div className="py-6">
                <Row>

                    <div className='container overflow-x-auto'>






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
                                {ownersData && ownersData.map((owner, index) =>
                                    <tr key={owner.id}>


                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm Deletion</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete {owner.firstName} {owner.lastName}?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={handleDelete}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <th scope="row">{index + 1}</th>
                                        <td>{owner.firstName} {owner.lastName}</td>
                                        <td>{owner.email}</td>
                                        <td>
                                            <Button onClick={() => router.push(`/owners/view?firstName=${owner.firstName}&lastName=${owner.lastName}&email=${owner.email}&phone=${owner.phone}&address=${owner.address}`)} variant="secondary" size='sm' className="me-2"><i className="fe fe-eye"></i></Button>

                                            <Button onClick={() => router.push(`/owners/edit?firstName=${owner.firstName}&lastName=${owner.lastName}&email=${owner.email}&phone=${owner.phone}&address=${owner.address}`)} variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>

                                            <Button onClick={handleShow} variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </Table>




                    </div>

                </Row>

            </div>

        </Container>
    )
}

export default Onwers;