import { Button, Col, Container, Row } from "ebs-design";
import Link from "next/link";
import "./Custom404";

const Custom404 = () => {
  return (
    <div className="wrap-error">
      <div className="d-flex align-items-center h-100">
        <Container >
          <Row size={6}>
            <Col className="box_center" size={12}>
              <h1 className="text-9xl">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <h5 className="text-9xl">Oops! Page not found</h5>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Custom404;
