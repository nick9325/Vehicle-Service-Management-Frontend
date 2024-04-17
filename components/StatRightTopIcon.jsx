
"use client"

import { Card } from 'react-bootstrap';

const StatRightTopIcon = (props) => {


    return (
        <Card>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">{props.title}</h4>
                    </div>
                   
                </div>
                <div>
                    <h1 className="fw-bold">{props.value}</h1>
                </div>
            </Card.Body>
        </Card>
    )
}



export default StatRightTopIcon