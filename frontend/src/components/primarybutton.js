import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
const PrimaryBtn = (prop) => {
  return (
    <Row className="primary-btn-row">
      <button className={prop.className} type={prop.type}>
        {prop.btnName}
      </button>
    </Row>
  );
};
export default PrimaryBtn;
