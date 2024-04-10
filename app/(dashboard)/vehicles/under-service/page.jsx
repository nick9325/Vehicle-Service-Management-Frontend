'use client'

import { Container } from 'react-bootstrap';
import ScheduledVehicleCard from '../../../../components/ScheduledVehicleCard'
import VehiclesNav from '../../../../components/VehiclesNav'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GetScheduleVehicles } from '../../../../constants/VehicleEndpoints';



const UnderService = () => {

  const router = useRouter();
  const [vehicleData, setVehicleData] = useState();


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

    } else if (response.status === 401) {
      toast.dismiss();
      toast.error('Please log in to continue');
      router.push('/authentication/sign-in');
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

      <div className="py-3">
        <div className="row">
          {vehicleData && vehicleData.map((vehicle) => (
            <div className="col-xl-4 col-md-6 col-sm-8 pb-3" key={vehicle.id}>
            
            <ScheduledVehicleCard ownerFirstname={vehicle.owner.firstName} ownerLastname={vehicle.owner.lastName} ownerAddress={vehicle.owner.address} vehicleModel={vehicle.vehicleModel} vehicleNumber={vehicle.vehicleNumber} vehicleDescription={vehicle.vehicleDescription} serviceStatus={'Scheduled'} />

          </div>
        ))}
      </div>
      </div>



    </Container>
  )
}

export default UnderService;