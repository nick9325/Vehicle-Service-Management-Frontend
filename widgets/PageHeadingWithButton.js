// import node module libraries
import { Row, Col, Button } from 'react-bootstrap';

const PageHeadingWithButton = props => {
  const { heading, buttonName } = props;
  return (
    <Row>
      <Col lg={12} md={12} xs={12}>

        <div className="border-bottom pb-4 mb-4 d-flex justify-content-between">
          <h3 className="mb-0 fw-bold">{heading}</h3>
          <Button variant="primary" className="me-1">{buttonName}</Button>
        </div>
    

      </Col>
    </Row>
  )
}

export default PageHeadingWithButton