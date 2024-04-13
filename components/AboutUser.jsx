
import { Col, Row, Card } from 'react-bootstrap';

const AboutUser = (props) => {

    return (
        <Col className="mb-6">
    
            <Card>
             
                <Card.Body>
                
                    <Card.Title as="h4">About Me</Card.Title>
                   
                    <Row>
                     
                        <Col xs={12} md={6} lg={6} xxl={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Name </h6>
                            <p className="mb-0">{props.firstName} {props.lastName}</p>
                        </Col>
                        <Col xs={12} md={6} lg={6} xxl={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Phone </h6>
                            <p className="mb-0">+91 {props.phone}</p>
                        </Col>
                        <Col xs={12} md={6} lg={6} xxl={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Email </h6>
                            <p className="mb-0">{props.email}</p>
                        </Col>
                        <Col xs={12} md={6} lg={6} xxl={6} className="mb-5">
                            <h6 className="text-uppercase fs-5 ls-2">Location</h6>
                            <p className="mb-0">{props.address}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default AboutUser;