'use client'

import { Col, Row, Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import VehicleCard from '../../../../components/VehicleCard'
import VehiclesNav from '../../../../components/VehiclesNav'


const UnderService = () => {


    return (
        <Container fluid className="p-6">

            <VehiclesNav />

            <div className="py-3 d-flex gap-3 flex-wrap">


            <VehicleCard serviceStatus = {'inProgress'} buttonName={''}/>
            <VehicleCard serviceStatus = {'inProgress'} buttonName={''}/>
            <VehicleCard serviceStatus = {'inProgress'} buttonName={''}/>
            <VehicleCard serviceStatus = {'inProgress'} buttonName={''}/>
            <VehicleCard serviceStatus = {'inProgress'} buttonName={''}/>
         
          
            

            </div>

        </Container>
    )
}

export default UnderService;