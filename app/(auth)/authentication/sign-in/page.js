'use client'


import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';


import useMounted from 'hooks/useMounted';
import { useEffect, useState } from 'react';
import { SignInAdvisor } from '../../../../constants/AuthConstants';

const SignIn = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasMounted = useMounted();






  const GetToken=()=>{


    

  }



  // useEffect(()=>{
    
  // },[])


  const signIn=async()=>{

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");



    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(`${SignInAdvisor}`, requestOptions)
    console.log(response)
    if (response.ok) {

    

      alert("login successful")
      
    }
    else {
      alert("failed to register advisor");
    }



  }





  const handleSignInClick=(e)=>{

    e.preventDefault();

    signIn()



  }

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">

        <Card className="smooth-shadow-md">
     
          <Card.Body className="p-6">
            <div className="mb-6 text-center">
            <h2 className="text-primary" style={{ fontWeight: '900' }}>Sign In</h2>
            </div>
     
            {hasMounted &&
           <Form >
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
     
           <Form.Group className="mb-6" controlId="password">
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
     
           <div>
             <div className="d-grid">
               <Button variant="primary" type="submit" onClick={handleSignInClick} >
                 Sign In
               </Button>
             </div>
             <div className="d-md-flex justify-content-end mt-4">
               <div className="mb-2 mb-md-0">
                 <Link href="/authentication/sign-up" className="fs-5">
                   Create An Account
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


export default SignIn