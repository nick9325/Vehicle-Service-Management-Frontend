'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';

const SignUp = () => {
  const hasMounted = useMounted();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
    <Col xxl={6} lg={8} md={10} xs={12} className="py-8 py-xl-0">
      {/* Card */}
      <Card className="smooth-shadow-md">
        {/* Card body */}
        <Card.Body className="p-6">
          <div className="mb-6 text-center">
       
          <h2 className="text-primary" style={{ fontWeight: '900' }}>Sign Up</h2>


      
          </div>
          {/* Form */}
          {hasMounted && 
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstname" placeholder="First Name" required="" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastname" placeholder="Last Name" required="" />
                  </Form.Group>
                </Col>
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email here" required="" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address here" required="" />
                  </Form.Group>
                </Col>
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="**************" required="" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirm-password" placeholder="**************" required="" />
                  </Form.Group>
                </Col>
              </Row>
  
        
  
              <div>
           
                <div className="d-grid mt-3">
                  <Button variant="primary" type="submit">Create Free Account</Button>
                </div>
                <div className="d-md-flex justify-content-end mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">Already have an account? Login </Link>
                  </div>
         
                </div>
              </div>
            </Form>
          }
        </Card.Body>
      </Card>
    </Col>
  </Row>
  
  )
}

export default SignUp