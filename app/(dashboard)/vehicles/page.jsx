'use client'

import { Col, Row, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import { PageHeading } from 'widgets'

import VehicleCard from '../../../components/VehicleCard'



const Vehicles = () => {


  return (
    <Container fluid className="p-6">




      



      <PageHeading heading="Due for Service" />


      <div className="py-6 d-flex gap-3 flex-wrap">
     

       

            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />
            <VehicleCard />

     
     

      </div>

    </Container>
  )
}

export default Vehicles;