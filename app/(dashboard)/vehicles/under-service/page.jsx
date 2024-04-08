'use client'

import { Col, Row, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';


import VehicleCard from '../../../../components/VehicleCard'
import VehiclesNav from '../../../../components/VehiclesNav'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { GetScheduleVehicles } from '../../../../constants/VehicleEndpoints';







const UnderService = () => {


  const router = useRouter();
  const [vehicleData, setVehicleData] = useState();
  const [ownerData, setOwnerData] = useState();

  // const fetchOwner = async (ownerId) => {

  //   toast.dismiss();
  //   toast.loading("Fetching owner..");

  //   const token = localStorage.getItem('token');
  //   console.log(token)
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };


  //   let response = await fetch(`${GetOwnerById}${ownerId}`, requestOptions);


  //   if (response.ok) {
  //     let res = await response.json();
  //     setOwnerData(res);

  //     console.log(ownerData);
  //     toast.dismiss();
  //     toast.success('Owner fetched successfully!');

  //   } else if (response.status === 403) {
  //     toast.dismiss();
  //     toast.error('Please log in to continue');
  //     router.push('/authentication/sign-in');
  //     alert('token expired!');
  //   } else {
  //     toast.dismiss();
  //     toast.error('Failed to fetch owner');
  //   }

  // }

  const fetchVehicles = async () => {

    toast.dismiss();
    toast.loading("Fetching vehicles..");

    const token = localStorage.getItem('token');
    console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };





    let response = await fetch(`${GetScheduleVehicles}`, requestOptions);


    if (response.ok) {
      let res = await response.json();
      setVehicleData(res);
      console.log(vehicleData);
  
   
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
    fetchVehicles();
  }, []);



  return (
    <Container fluid className="p-6">

      <VehiclesNav />

      <div className="py-3 d-flex gap-3 flex-wrap">
        {vehicleData  &&  vehicleData.map((vehicle) => (
          <div key={vehicle.id}>
            
            <VehicleCard vehicleModal={vehicle.vehicleModal} vehicleNumber={vehicle.vehicleNumber} vehicleDescription={vehicle.vehicleDescription} serviceStatus={'scheduled'} />

          </div>
        ))}
      </div>



    </Container>
  )
}

export default UnderService;