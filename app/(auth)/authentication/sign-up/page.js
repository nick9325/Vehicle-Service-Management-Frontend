'use client'

import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';

import useMounted from 'hooks/useMounted';
import { useState } from 'react';
import { SignUpAdmin } from '../../../../constants/AuthConstants';

const SignUp = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasMounted = useMounted();




  const SaveAdvisor = async () => {


    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "firstName": firstname,
      "lastName": lastname,
      "phone": phone,
      "address": address,
      "email": email,
      "password": password
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${SignUpAdmin}`, requestOptions)
    console.log(response)
    if (response.ok) {

      alert("login successful")
      

    }
    else {
      alert("failed to register advisor");
    }


  }



  const handleSubmitClick = (e) => {

    e.preventDefault();


    if (password !== confirmPassword) {
      alert('Password do not match')
    }
    else {

      SaveAdvisor();
      setFirstname('');
      setLastname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setAddress('');

    }





  }


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
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email here"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter mobile number"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**************"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="confirm-password">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="**************"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address here"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div>
                  <div className="d-grid mt-3">
                    <Button variant="primary" type="submit" onClick={handleSubmitClick}>
                      Submit
                    </Button>
                  </div>
                  <div className="d-md-flex justify-content-end mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-in" className="fs-5">
                        Already have an account? Login
                      </Link>
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