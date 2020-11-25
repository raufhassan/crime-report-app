import React from "react";
import { Form } from "react-bootstrap";
const Input = ({ label, onChange, type, value, name }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={(e) => onChange(e, name)}
        required
      />
    </Form.Group>
  );
};

export default Input;
