'use client'


import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';


import useMounted from 'hooks/useMounted';

const SignIn = () => {

  const hasMounted = useMounted();

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">

        <Card className="smooth-shadow-md">
     
          <Card.Body className="p-6">
            <div className="mb-6 text-center">
            <h2 className="text-primary" style={{ fontWeight: '900' }}>Sign In</h2>
            </div>
     
            {hasMounted &&
              <Form>
           
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email here" required="" />
                </Form.Group>

           
                <Form.Group className="mb-6" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="**************" required="" />
                </Form.Group>

                <div>
            
                  <div className="d-grid">
                    <Button variant="primary" type="submit">Sign In</Button>
                  </div>
                  <div className="d-md-flex justify-content-end mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">Create An Account </Link>
                    </div>
             
                  </div>
                </div>
              </Form>}


          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}


export default SignIn