'use client'

import { Col, Row, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';


import VehicleCard from '../../../components/VehicleCard'
import VehiclesNav from '../../../components/VehiclesNav'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';







const Vehicles = () => {


  const router = useRouter();

  const fetchDueVehicles = async () => {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      let response = await fetch("https://vehicle-service-management.onrender.com/vehicle/get/all/due", requestOptions);
      let res = await response.json();

      console.log(res);

      if (response.ok) {
        alert("fetched!");
      } else if (response.status === 403) {
        router.push('/authentication/sign-in');
        alert('token expired!');
      } else {
        alert("failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching due vehicles:", error);
      alert("An error occurred while fetching due vehicles");
    }
  };


  useEffect(() => {
    fetchDueVehicles();

  }, []);



  return (
    <Container fluid className="p-6">

      <VehiclesNav />


      <div className="py-3 d-flex gap-3 flex-wrap ">


        <VehicleCard serviceStatus={'pending'} buttonName={'Schedule'} />



      </div>

    </Container>
  )
}

export default Vehicles;