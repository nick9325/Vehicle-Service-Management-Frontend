'use client'


import { Col, Row, Container, Table, ButtonGroup, Button } from 'react-bootstrap';
import { PageHeading, PageHeadingWithButton } from 'widgets'


const Customers = () => {
    return (
        <Container fluid className="p-6">

            <PageHeadingWithButton heading="Work Items" buttonName="Add New Customer" />

            <div className="py-6">
                <Row>

                    <div className='container'>

                    <Table className="text-nowrap">
                        <thead >
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Prasad Hiwarkar</td>
                                <td>prasad@gmail.com</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>

                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Vaibhavi Hule</td>
                                <td>vaibhavi@gmail.com</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Nikhil Magar</td>
                                <td>nikhil@gmail.com</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>

                </Row>

            </div>

        </Container>
    )
}

export default Customers;