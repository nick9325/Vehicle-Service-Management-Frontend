"use client"

import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

const ServicedVehicleCard = (props) => {
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const router = useRouter();

    const toggleDescription = () => {
        setDescriptionExpanded(!descriptionExpanded);
    };


    const generateInvoice = async () => {
        toast.dismiss();
        toast.loading("Generating invoice..");
    
        const token = localStorage.getItem('token');
        console.log(token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
    
        try {
            let response = await fetch(`https://vehicle-service-management.onrender.com/invoice/generate?vehicleId=${props.vehicleId}`, requestOptions);
    
            if (response.ok) {
                let blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',  `Invoice ${props.vehicleNumber}.pdf`);
                document.body.appendChild(link);
                link.click();
    
                toast.dismiss();
                toast.success('Invoice generated successfully!');
            } else if (response.status === 401) {
                toast.dismiss();
                toast.error('Please log in to continue');
                router.push('/authentication/sign-in');
            } else {
                toast.dismiss();
                toast.error('Failed to generate invoice');
            }
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast.dismiss();
            toast.error('Failed to generate invoice');
        }
    }
    


    const handleGenerateInvoice=(e)=>{
        e.preventDefault();
        generateInvoice();
    }


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
                <Card.Text className={`pb-1 small`}>
                    <span className='d-flex align-items-center pb-2 gap-1 border-bottom'><i className='fe fe-user'></i> {props.ownerFirstname} {props.ownerLastname}</span>
                    <span className='d-flex align-items-center pt-2 gap-1'><i className='fe fe-map-pin mr-2'></i>{props.ownerAddress}</span>
                </Card.Text>
                <Button onClick={handleGenerateInvoice} className='' variant="primary" size='sm'>{props.buttonName}</Button>
            </Card.Body>
        </Card>

    );
};

export default ServicedVehicleCard;
