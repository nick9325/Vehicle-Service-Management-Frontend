"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import { GetAllServiceAdvisors } from "../constants/ServiceAdvisorEndpoints";
import { Button, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import { PostScheduleVehicle } from "../constants/ServiceEndpoints";
import { useRouter } from "next/navigation";



const SelectModal = (props) => {

    const [advisorsData, setAdvisorsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const router = useRouter();


    const getAllAdvisors = async () => {


        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        let response = await fetch(`${GetAllServiceAdvisors}`, requestOptions);

        if (response.ok) {
            let res = await response.json();
            setAdvisorsData(res);
            setLoading(false);
        } else if (response.status === 401) {
            toast.dismiss();
            toast.error('Please log in to continue');
            router.push('/authentication/sign-in');
        } else {
            toast.dismiss();
            toast.error('Failed to fetch service advisors');
        }
    };


    const scheduleVehicle = async () => {
        toast.dismiss();
        toast.loading('Scheduling vehicle..');

        const token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };

        let response = await fetch(`${PostScheduleVehicle}?vehicleNumber=${props.vehicleNumber}&serviceAdvisorId=${selectedAdvisor.value}`, requestOptions);

        if (response.ok) {
            let res = await response.json();
            console.log(res);
            setSelectedAdvisor(null);
            router.push('/vehicles/under-service');
            toast.dismiss();
            toast.success('Vehicle scheduled successfully!');
        } else if (response.status === 401) {
            toast.dismiss();
            router.push('/authentication/sign-in');
            toast.error('Please log in to continue');
        } else {
            toast.dismiss();
            toast.error('Failed to schedule vehicle');
        }
    };

    useEffect(() => {
        getAllAdvisors();
    }, [])


    const handleScheduleClick=(e)=>{
        e.preventDefault();

        if(!selectedAdvisor){
            toast.error("Please select service advisor")
        }
        else{
            scheduleVehicle();
        }
    }





    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Service Advisor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                <Form>

                    {!loading ?

                        <Form.Group controlId="advisor" className="col-12"> {/* Use col-12 class here */}
                            <Form.Label className=''>Select advisor</Form.Label>
                            <Select
                                id="advisor"
                                name="advisor"
                                value={selectedAdvisor}
                                onChange={(selectedOption) => setSelectedAdvisor(selectedOption)}
                                options={advisorsData.map((advisor) => ({
                                    value: advisor.id,
                                    label: advisor.email,
                                }))}
                            />
                        </Form.Group>

                        :
                        <div className='text-center'>
                            <Spinner animation="border" />
                        </div>
                    }

                </Form>
            </Modal.Body>


            <Modal.Footer>
                <Button onClick={handleScheduleClick}>Schedule Vehicle</Button>
            </Modal.Footer>
        </Modal>
    );




    // return (
    //     <Fragment>
    //         <Button variant="primary" onClick={() => setModalShow(true)}>
    //             Launch demo modal
    //         </Button>
    //         <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    //     </Fragment>
    // )
}

export default SelectModal;