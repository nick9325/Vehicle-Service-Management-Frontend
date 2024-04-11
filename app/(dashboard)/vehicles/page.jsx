'use client'

import { Container } from 'react-bootstrap';
import VehiclesNav from '../../../components/VehiclesNav'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GetDueVehicles } from '../../../constants/VehicleEndpoints';
import toast from 'react-hot-toast';
import DueVehicleCard from '../../../components/DueVehicleCard';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-bootstrap-icons';


const Vehicles = () => {

  const router = useRouter();
  const [vehicleData, setVehicleData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchDueVehicles = async () => {

    const token = localStorage.getItem('token');
    console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };


    let response = await fetch(`${GetDueVehicles}`, requestOptions);


    if (response.ok) {
      let res = await response.json();
      setVehicleData(res);
      console.log(vehicleData);
      setLoading(false);

    } else if (response.status === 401) {
      setLoading(false);
      toast.dismiss();
      toast.error('Please log in to continue');
      router.push('/authentication/sign-in');
    } else {
      setLoading(false);
      toast.dismiss();
      toast.error('Failed to fetch vehicles');
    }

  }


  useEffect(() => {
    fetchDueVehicles();
  }, []);



  return (
    <Container fluid className="p-6">

      <VehiclesNav />





      <div className="py-3">
        {!loading ?
          <div className="row">
            {vehicleData.length >= 1 ? vehicleData.map((vehicle) => (
              <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-8 pb-3" key={vehicle.id}>

                <DueVehicleCard ownerFirstname={vehicle.owner.firstName} ownerLastname={vehicle.owner.lastName} ownerAddress={vehicle.owner.address} vehicleModel={vehicle.vehicleModel} vehicleNumber={vehicle.vehicleNumber} vehicleDescription={vehicle.vehicleDescription} serviceStatus={'DUE'} buttonName={'Schedule'} />

              </div>
            )) : <div className='text-center'>
              <h3>No Vehicles Found ! </h3>

            </div>}
          </div> :
          <div className='text-center'>
            <Spinner animation="border" />
          </div>}
      </div>



    </Container>
  )
}

export default Vehicles;