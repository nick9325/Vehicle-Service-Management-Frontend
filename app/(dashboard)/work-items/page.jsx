'use client'


import { Col, Row, Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import { PageHeading, PageHeadingWithButton } from 'widgets'


const WorkItems = () => {
    return (
        <Container fluid className="p-6">

            <PageHeadingWithButton heading="Work Items" buttonName="Add New Item" />




            <div className="py-6">
                <Row>

                    <Table className="text-nowrap">
                        <thead >
                            <tr>
                             
                                <th scope="col">Name</th>
                                <th scope="col">Cost (&#8377;)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                             
                                <td>Oil Change</td>
                                <td>200</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>

                            </tr>
                            <tr>
                             
                                <td>Wheel Alignment</td>
                                <td>500</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>
                            </tr>
                            <tr>
                             
                                <td>Brake Pad Replacement</td>
                                <td>450</td>
                                <td>
                                    <Button variant="success" size='sm' className="me-2"><i className="fe fe-edit"></i></Button>
 
                                    <Button variant="danger" size='sm' className=""><i className="fe fe-trash-2"></i></Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                </Row>

            </div>

        </Container>
    )
}

export default WorkItems;