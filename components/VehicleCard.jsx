import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';

const VehicleCard = () => {

    const serviceStatus = 'complete';

    const getStatusColor = () => {
        switch (serviceStatus) {
            case 'pending':
                return 'danger';
            case 'inProgress':
                return 'warning';
            case 'complete':
                return 'success';
            default:
                return 'secondary';
        }
    };


    return (
        <Card className="border-primary" style={{ maxWidth: '18rem' }}>
            <Card.Body className="text-dark">
                <Card.Title className="text-primary mb-4 d-flex align-items-center justify-content-between border-bottom pb-3">
                    <div className='d-flex align-items-center gap-2'>
                        <FaCar size={24} />
                        <span className="fs-5">Vehicle Details</span>
                    </div>

                    <Badge bg={getStatusColor()}>{serviceStatus}</Badge>
                </Card.Title>
                <Card.Text className="mb-3">
                    <strong>Vehicle Number:</strong> MH 4404
                </Card.Text>
                <Card.Text className="mb-3">
                    <strong>Model Number:</strong> ABC123
                </Card.Text>



                <Card.Text className="mb-3">
                    <strong>Description:</strong> Change oil as well as Fuel filter. Make proper Wheel alignment of all Vehicles.
                </Card.Text>
                <Card.Text className="pb-3 border-bottom">
                    <strong>Due Date:</strong> 05-03-2024
                </Card.Text>
                <Card.Text className="pb-3 border-bottom small d-flex justify-content-between">
                    <div>
                    <i className='fe fe-user'></i> John Doe
                    </div>
                    <div>
                    <i className='fe fe-map-pin'></i> Pune, Maharashtra
                    </div>
            
                </Card.Text>
               
                




                <Button className='' variant="primary" size='sm'>Schedule</Button>




            </Card.Body>
        </Card>
    );
};

export default VehicleCard;
