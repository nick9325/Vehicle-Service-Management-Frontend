"use client"

import { useEffect, useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import StatRightTopIcon from "./StatRightTopIcon";
import { GetVehiclesSummary } from "../constants/VehicleEndpoints";
import Spinner from 'react-bootstrap/Spinner'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const DashBoard = () => {

    const router = useRouter();


    const [vehiclesSummary, setVehiclesSummary] = useState();
    const [loading, setLoading] = useState(true);


    const fetchVehiclesSummary = async () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            console.log(token);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
    
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
    
            try {
                let response = await fetch(`${GetVehiclesSummary}`, requestOptions);
                console.log(response);
    
                if (response.ok) {
                    let res = await response.json();
                    console.log(res);
                    setVehiclesSummary(res);
                    setLoading(false);
                } else if (response.status === 401) {
                    setLoading(false);
                    toast.dismiss();
                    toast.error('Please log in to continue');
                    router.push('/authentication/sign-in');
                } else {
                    setLoading(false);
                    toast.dismiss();
                    toast.error('Failed to fetch vehicles summary');
                }
            } catch (error) {
                console.error('Error fetching vehicles summary:', error);
                setLoading(false);
                toast.dismiss();
                toast.error('Failed to fetch vehicles summary');
            }
        }
    };
    

    useEffect(() => {
        fetchVehiclesSummary();
    }, [])


    return (
        <>
            {!loading && <div className="bg-primary pt-10 pb-21"></div>}
            {!loading ?
                <Container fluid className="mt-n22 px-6">
                    <Row>
                        <Col lg={12} md={12} xs={12}>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mb-2 mb-lg-0">
                                        <h3 className="mb-0  text-white">Vehicles Summary</h3>
                                    </div>

                                </div>
                            </div>
                        </Col>

                        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" >
                            <StatRightTopIcon title={"Due"} value={vehiclesSummary.Due} />
                        </Col>
                        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" >
                            <StatRightTopIcon title={"Scheduled"} value={vehiclesSummary.Scheduled} />
                        </Col>
                        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" >
                            <StatRightTopIcon title={"Under Servicing"} value={vehiclesSummary["Under-servicing"]} />
                        </Col>
                        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" >
                            <StatRightTopIcon title={"Serviced"} value={vehiclesSummary.Serviced} />
                        </Col>

                        <Col xl={3} lg={6} md={12} xs={12} className="mt-6" >
                            <StatRightTopIcon title={"Total"} value={vehiclesSummary.All} />
                        </Col>

                    </Row>

                </Container> : <div className="text-center pt-6"> <Spinner animation="border" /></div>}
        </>
    )
}



export default DashBoard;