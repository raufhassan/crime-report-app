import React from "react";
import { Form } from "react-bootstrap";
const Dropdown = ({ value, name, onChange, options, label }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" value={value} name={name} onChange={onChange}>
        {options.map((el, i) => {
          return <option key={i}> {el}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default Dropdown;
