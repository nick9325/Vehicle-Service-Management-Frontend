'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from 'react-select'; // Import react-select

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import VehiclesNav from '../../../../components/VehiclesNav';

import toast from 'react-hot-toast';
import { RegisterVehicle } from '../../../../constants/VehicleEndpoints';
import { GetAllOwners } from '../../../../constants/OwnerEndpoints';

const AddVehicle = () => {
    const router = useRouter();

    const [vehicleNumber, setVehicleNumber] = useState('');
    const [modalNumber, setModalNumber] = useState('');
    const [vehicleDescription, setVehicleDescription] = useState('');
    const [selectedOwner, setSelectedOwner] = useState(null);


    const [ownersData, setOwnersData] = useState([]);

    const getAllOwners = async () => {
        toast.dismiss();
        toast.loading('Fetching owners..');

        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        let response = await fetch(`${GetAllOwners}`, requestOptions);

        if (response.ok) {
            let res = await response.json();
            setOwnersData(res);
            toast.dismiss();
            toast.success('Owners fetched successfully!');
        } else if (response.status === 401) {
            toast.dismiss();
            toast.error('Please log in to continue');
            router.push('/authentication/sign-in');
        } else {
            toast.dismiss();
            toast.error('Failed to fetch owners');
        }
    };

    const registerNewVehicle = async () => {
        toast.dismiss();
        toast.loading('Adding vehicle..');

        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        var raw = JSON.stringify({
            ownerId: selectedOwner.value,
            vehicleNumber: vehicleNumber,
            vehicleModel: modalNumber,
            vehicleDescription: vehicleDescription,
            serviceStatus: 'DUE',
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let response = await fetch(`${RegisterVehicle}`, requestOptions);

        if (response.ok) {
            let res = await response.json();
            console.log(res);
            setVehicleNumber('');
            setModalNumber('');
            setVehicleDescription('');
            setSelectedOwner(null);
            toast.dismiss();
            toast.success('Vehicle added successfully!');
        } else if (response.status === 401) {
            toast.dismiss();
            router.push('/authentication/sign-in');
            toast.error('Please log in to continue');
        } else {
            toast.dismiss();
            toast.error('Failed to add vehicle');
        }
    };

    const SaveVehicle = (e) => {
        e.preventDefault();

        if(vehicleNumber===""){
            toast.dismiss();
            toast.error("Vehicle number required!")
        }
        else if(modalNumber===""){
            toast.dismiss();
            toast.error("Vehicle model required!")
        }
        else if(vehicleDescription===""){
            toast.dismiss();
            toast.error("Vehicle service description required!")
        }
        else if(vehicleDescription.length<30){
            toast.dismiss();
            toast.error("Vehicle service description must be greater than 30 words");
        }
        else if(selectedOwner===null){
            toast.dismiss();
            toast.error("Please select vehicle owner")
        }
        else{
            registerNewVehicle();
        }


    };

    useEffect(() => {
        getAllOwners();
    }, []);

    return (
        <Container fluid className="p-6">
            <VehiclesNav />
            <div className="py-3">

           
                <Row>
                    <div className="container">
                        <Row className="justify-content-center">
                            <Col>
                                <Card>
                                    <Card.Header className="bg-primary text-white">
                                        <Card.Title className="mb-0">Add New Vehicle</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="vehicleNumber">Vehicle Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        id="vehicleNumber"
                                                        name="vehicleNumber"
                                                        placeholder="Enter vehicle number"
                                                        value={vehicleNumber}
                                                        onChange={(e) => setVehicleNumber(e.target.value)}
                                                    />
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="modelNumber">Model Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        id="modelNumber"
                                                        name="modelNumber"
                                                        placeholder="Enter model number"
                                                        value={modalNumber}
                                                        onChange={(e) => setModalNumber(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="description">Service Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        id="description"
                                                        name="description"
                                                        placeholder="Enter description"
                                                        value={vehicleDescription}
                                                        onChange={(e) => setVehicleDescription(e.target.value)}
                                                    />
                                                </Col>

                                                <Col md={6} className="mb-3">
                                                    <Form.Label htmlFor="owner">Select Owner</Form.Label>
                                                    <Select
                                                        id="owner"
                                                        name="owner"
                                                        value={selectedOwner}
                                                        onChange={(selectedOption) => setSelectedOwner(selectedOption)}
                                                        options={ownersData.map((owner) => ({
                                                            value: owner.id,
                                                            label: owner.email,
                                                        }))}
                                                    />
                                                </Col>
                                            </Row>
                                            <Button variant="primary" type="submit" onClick={SaveVehicle}>
                                                Add Vehicle
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
        </Container>
    );
};

export default AddVehicle;
