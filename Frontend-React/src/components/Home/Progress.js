import React from "react";
import { Row, Col, Container } from "reactstrap";

const Progress = (props) => {
  return (
    <div className="progress-card">
      <Row>
        <Col className="my-flex-props" lg='4'>
        icon
        </Col>
        <Col lg='8'>
          <h4>{props.h3}</h4>
          <h5>continue learning</h5>
          <progress value={props.val} />
        </Col>
      </Row>
    </div>
  );
};

export default Progress;
