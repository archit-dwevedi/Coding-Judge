import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
const InputComponent = (props) => {
  return (
    <Row className="input-row">
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
      />
    </Row>
  );
};
export default InputComponent;
