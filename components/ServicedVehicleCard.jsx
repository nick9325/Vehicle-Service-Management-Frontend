import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';

const ServicedVehicleCard = (props) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);

    const toggleDescription = () => {
        setDescriptionExpanded(!descriptionExpanded);
    };


    return (

        <Card className="border-primary" style={{ maxWidth: '18rem' }}>
            <Card.Body className="text-dark">
                <Card.Title className="text-primary mb-4 d-flex align-items-center justify-content-between border-bottom pb-3">
                    <div className='d-flex align-items-center gap-2'>
                        <FaCar size={24} />
                        <span className="fs-5">Vehicle Details</span>
                    </div>
                    <Badge bg={'success'}>{props.serviceStatus}</Badge>
                </Card.Title>
                <Card.Text className="mb-3">
                    <strong>Vehicle Number:</strong> {props.vehicleNumber}
                </Card.Text>
                <Card.Text className="mb-3">
                    <strong>Model Number:</strong> {props.vehicleModel}
                </Card.Text>
                <Card.Text className="mb-3">
                    <strong>Description:</strong> {descriptionExpanded ? props.vehicleDescription : `${props.vehicleDescription?.slice(0, 30)}...`}
                    {!descriptionExpanded && props.vehicleDescription.length > 30 && <Button variant="link" size="sm" onClick={toggleDescription}>Read More</Button>}
                </Card.Text>
                <Card.Text className={`pb-3 border-bottom small d-flex justify-content-between`}>
                    <span className='d-flex align-items-center justify-content-center gap-1'><i className='fe fe-user'></i> {props.ownerFirstname} {props.ownerLastname}</span>
                    <span className='d-flex align-items-center justify-content-center gap-1'><i className='fe fe-map-pin mr-2'></i>{props.ownerAddress}</span>
                </Card.Text>
                <Button className='' variant="primary" size='sm'>{props.buttonName}</Button>
            </Card.Body>
        </Card>

    );
};

export default ServicedVehicleCard;
