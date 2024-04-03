'use client'

import { Col, Row, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import VehicleCard from '../../../../components/VehicleCard'
import VehiclesNav from '../../../../components/VehiclesNav'


const ServiceCompleted = () => {


  return (
    <Container fluid className="p-6">

      <VehiclesNav/>

      <div className="py-3 d-flex gap-3 flex-wrap">
     

        <VehicleCard serviceStatus = {'completed'} buttonName={'Generate Invoice'}/>
        <VehicleCard serviceStatus = {'completed'} buttonName={'Generate Invoice'}/>
        <VehicleCard serviceStatus = {'completed'} buttonName={'Generate Invoice'}/>
        <VehicleCard serviceStatus = {'completed'} buttonName={'Generate Invoice'}/>
        <VehicleCard serviceStatus = {'completed'} buttonName={'Generate Invoice'}/>
      


      </div>

    </Container>
  )
}

export default ServiceCompleted;